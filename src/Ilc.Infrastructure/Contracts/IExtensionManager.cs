using System.Activities;

namespace Ilc.Infrastructure.Contracts
{
    public interface IExtensionManager
    {
        void Configure(WorkflowApplication workflowApplication);
    }
}