using System;
using System.Activities;
using System.Activities.DurableInstancing;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Ilc.Infrastructure.Contracts;
using Ilc.Infrastructure.Workflows;

namespace Ilc.Infrastructure
{
    public class WorkflowProcess : INotifyHost
    {
        private Activity GetActivity(WorkflowIdentity identity)
        {
            if (identity == null) return new Training();

            var definitions = new Dictionary<WorkflowIdentity, Activity>()
                {
                    // { null, new Training() },
                    { new WorkflowIdentity("Sample", new Version(1, 0, 0), "MyPackage"), new Training() },
                    { new WorkflowIdentity("Sample", new Version(1, 0, 0, 0), "MyPackage"), new Training() },
                    { new WorkflowIdentity("Sample", new Version(2, 0, 0, 0), "MyPackage"), new Training_V2() }
                };

            return definitions[identity];
        }

        private Activity GetActivity(Type type)
        {
            var definitions = new Dictionary<Type, Activity>()
                {
                    { typeof(Training), new Training_V2() }
                };
            return definitions[type];
        }

        private WorkflowIdentity GetIdentity(Type type)
        {
            var definitions = new Dictionary<Type, WorkflowIdentity>()
                {
                    { typeof(Training), new WorkflowIdentity("Sample", new Version(2, 0, 0, 0), "MyPackage") }
                };
            return definitions[type];
        }

        private IDictionary<string, object> _results;
        private WorkflowApplication _wfApp;
        private readonly IExtensionManager _extensionManager;
        private ManualResetEventSlim _resetEvent;
        private SqlWorkflowInstanceStore _store;
        private bool _isInMemory;
        private Exception _workflowException;

        public WorkflowProcess(IExtensionManager extensionManager, Activity wfActivity) : this(extensionManager, wfActivity, new Dictionary<string, object>()) { }

        public WorkflowProcess(IExtensionManager extensionManager, Activity wfActivity, IDictionary<string, object> inputs )
        {
            _extensionManager = extensionManager;
            _results = new Dictionary<string, object>();
            _resetEvent = new ManualResetEventSlim(false);

            var identity = GetIdentity(wfActivity.GetType());

            _wfApp = inputs.Keys.Count == 0 ? new WorkflowApplication(GetActivity(wfActivity.GetType()), identity) : new WorkflowApplication(GetActivity(wfActivity.GetType()), inputs, identity);

            ConfigureExtensions();
            ConfigureInstanceStore();
            _wfApp.InstanceStore = _store;
        }

        private void Reconfigure(WorkflowApplicationInstance instance)
        {
            if (_isInMemory) _wfApp.Unload();

            var identity = instance.DefinitionIdentity;
            var definition = GetActivity(identity);

            _wfApp = new WorkflowApplication(definition, identity)
                {
                    SynchronizationContext = new SyncContext()
                };

            ConfigureExtensions();

        }

        /// <summary>
        /// This method finishes if:
        ///     - Completed handler is called;
        ///     - PersistableIdle handler is called;
        /// It throws an error if:
        ///     - OnUnhandledException is called;
        /// </summary>
        public IDictionary<string, object> Start(PersistableIdleAction idleAction = PersistableIdleAction.None)
        {
            ConfigureWorkflowApplicationEvents(idleAction);

            _wfApp.Run();
            _results.Add("InstanceId", _wfApp.Id);
            _isInMemory = true;


            _resetEvent.Wait();

            // Check if there is any exception to bubble up
            BubbleException();
            return _results;
        }

        /// <summary>
        /// This method finishes if it:
        ///     - Completed handler is called;
        ///     - PersistableIdle handler is called;
        /// It throws an error if:
        ///     - OnUnhandledException is called;
        /// </summary>
        /// <param name="idleAction">Default is <see cref="PersistableIdleAction.None"/></param>
        public IDictionary<string, object> Resume(Guid instanceId, string bookmarkName, object value, PersistableIdleAction idleAction = PersistableIdleAction.None)
        {
            _resetEvent.Reset();
            if (instanceId != Guid.Empty)
            {
                var instance = WorkflowApplication.GetInstance(instanceId, _store);
                Reconfigure(instance);

                ConfigureWorkflowApplicationEvents(idleAction);

                // should i load, or is it already in memory?
                if (!_isInMemory)
                {
                    _wfApp.Load(instance);
                    _isInMemory = true;
                }
            }

            // check if there are any bookmarks
            if (_wfApp.GetBookmarks().All(bookmark => bookmark.BookmarkName != bookmarkName))
            {
                var availableBookmarks = _wfApp.GetBookmarks();
                var str = "";
                foreach (var availableBookmark in availableBookmarks)
                {
                    str += " " + availableBookmark.BookmarkName;
                }
                
                _wfApp.Unload();
                throw new InvalidOperationException("This application has no bookmarks. Available bookmarks:" + str);
            }

            _wfApp.ResumeBookmark(bookmarkName, value);

            _resetEvent.Wait();

            // Check if there is any exception to bubble up
            BubbleException();
            return _results;
        }

        private void BubbleException()
        {
            if (_workflowException == null) return;

            throw new ApplicationException(_workflowException.Message, _workflowException); ;
        }


        private void ConfigureWorkflowApplicationEvents(PersistableIdleAction idleAction)
        {
            _wfApp.Completed = e =>
            {
                _resetEvent.Set();
            };
            _wfApp.PersistableIdle = e =>
            {
                _resetEvent.Set();
                return idleAction;
            };
            _wfApp.OnUnhandledException = e =>
            {
                _workflowException = e.UnhandledException;
                _resetEvent.Set();
                return UnhandledExceptionAction.Abort;
            };
            _wfApp.Aborted = e =>
            {
                _resetEvent.Set();
            };
        }

        private void ConfigureInstanceStore()
        {
            var cs = ConfigurationManager.ConnectionStrings["AppConnection"].ToString();
            // TODO: create a method that takes advantage of the behaviour mode in serviceBehaviour and returns a SqlWorkflowInstanceStore
            // dafaq does this mean?
            _store = new SqlWorkflowInstanceStore(cs);

            WorkflowApplication.CreateDefaultInstanceOwner(_store, null, WorkflowIdentityFilter.Any);
            // 
        }

        private void ConfigureExtensions()
        {
            _wfApp.Extensions.Add(this);
            _extensionManager.Configure(_wfApp);
        }

        public void SendMessage(object value)
        {
            _results = (IDictionary<string, object>)value;
        }

        public void Unload()
        {
            _wfApp.Unload();
        }
    }

    public class SyncContext : SynchronizationContext
    {
        public override void Post(SendOrPostCallback d, object state)
        {
            d(state);
        }

        public override void Send(SendOrPostCallback d, object state)
        {
            d(state);
        }
    }
}
