Ext.Loader.setPath('Ext.ux', 'Scripts/app/ux');

Ext.application({
    name: 'Ilc',
    appFolder: 'Scripts/app',

    controllers: [
        'Home',
        'Tasks',
        'Trainings',
        'Customers',
        'Students',
        'Statistics',
        'Trainers',
        'Tasks',
        'Users',
        'Roles',
        'Subjects',
        'Settings',
        'StatusDefinitions',
        'Planning',
        'Contacts',
        'Spendings',
        'Lessons',
        'Availability',
        'Templates',
        'Companies',
        'Interviews'
    ],

    requires: [
        'Ext.ux.Router',
        'Ilc.helpers.AppConfig',
        'Ilc.resources.Manager',
        'Ilc.Configuration',
        'Ilc.utils.Forms'
    ],
    
    views: [
        'home.Evaluation',
        'trainings.List',
        'customers.List',
        'students.List',
        'statistics.View',
        'trainers.List',
        'tasks.List',
        'users.List',
        'roles.List',
        'subjects.List',
        'settings.Default',
        'planning.Default',
        'availability.Default',
        'companies.List'
    ],  
        
    routes: {
        '/': 'trainings#list',
        'trainings': 'trainings#list',
        'customers': 'customers#list',
        'students': 'students#list',
        'statistics': 'statistics#view',
        'trainers': 'trainers#list',
        'tasks': 'tasks#list',
        'users': 'users#list',
        'roles': 'roles#list',
        'subjects': 'subjects#list',
        'settings': 'settings#default',
        'planning': 'planning#default',
        'availability': 'availability#default',
        'companies': 'companies#list'
    },

    enableRouter: true,

    launch: function () {
        
        
        var gridCfgStore = Ext.create('Ilc.store.GridConfig', { autoLoad: false });

        gridCfgStore.on('load', function () {
            Ilc.helpers.AppConfig.gridColumnStore = gridCfgStore;
            Ext.create('Ilc.routing.Router').init();
            
            // router dispatch event has been fired before we had the change to init the Router component,
            // that is why we fire it manually from here
            Ext.History.fireEvent('change', window.location.hash.substring(1));
        });

        Ext.Ajax.defaultHeaders = {
            'Content-Type': 'application/json'
        };
        Ext.Ajax.request({
            url: 'api/configuration?format=json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var configuration = Ext.JSON.decode(response.responseText);
                Ilc.Configuration.set(configuration);
                
                Ext.create('Ilc.view.Viewport');

                gridCfgStore.load();
            },
            failure: function (error) {
                
            }
        });

        // Defaults
        Ext.window.Window.prototype.bodyPadding = 10;
        Ext.window.Window.prototype.modal = true;
        Ext.window.Window.prototype.hideAction = 'destroy';

        Ext.form.field.Date.prototype.format = Ilc.resources.Manager.getResourceString('formats.extjsdate');


        // Bryntum Scheduler
        Sch.preset.Manager.registerPreset('hourAndDayLarge', {
            timeColumnWidth: 60,
            rowHeight: 24,
            resourceColumnWidth: 100,
            displayDateFormat: 'G:i',
            shiftIncrement: 1,
            shiftUnit: "DAY",
            defaultSpan: 24,
            timeResolution: {
                unit: "MINUTE",
                increment: 30
            },
            headerConfig: {
                middle: {
                    unit: "HOUR",
                    align: 'center',
                    dateFormat: 'G:i a'
                },
                top: {
                    unit: "DAY",
                    align: 'center',
                    dateFormat: 'D d/m'
                }
            }
        });

        // Override this method to provide the operation parameter to the load event
        Ext.override(Ext.data.Store, {
            onProxyLoad: function (operation) {
                var me = this,
                    resultSet = operation.getResultSet(),
                    records = operation.getRecords(),
                    successful = operation.wasSuccessful();

                if (me.isDestroyed) {
                    return;
                }

                if (resultSet) {
                    me.totalCount = resultSet.total;
                }




                me.loading = false;
                if (successful) {
                    me.loadRecords(records, operation);
                }

                if (me.hasListeners.load) {
                    me.fireEvent('load', me, records, successful, operation);
                }



                if (me.hasListeners.read) {
                    me.fireEvent('read', me, records, successful);
                }


                Ext.callback(operation.callback, operation.scope || me, [records, operation, successful]);
            }
        });

        var loginWindow = null;
        var requestsQueue = [];

        var forEachFunc = function (item) {
            if (item.options.callback) {
                item.options.callback = item.handler;
            } else {
                item.options.failure = item.handler;
            }

            Ext.Ajax.request(item.options);
        };

        Ext.override(Ext.data.Connection, {
            request: function (options) {
                var me = this;
                // debugger;
                if (options.callback) {
                    var originalHandler = options.callback;
                    // 
                    var customCallback = function (opts, success, response) {
                        if (success) {
                            originalHandler(opts, success, response);
                        } else {

                            requestsQueue.push({
                                options: opts,
                                handler: originalHandler
                            });

                            if (loginWindow) {
                                return;
                            }

                            loginWindow = Ext.create('Ilc.window.Login', {
                                handler: function () {

                                    var window = this.up('window');
                                    var model = Ilc.utils.Forms.extractModel(window.query('textfield'));


                                    var url = 'api/auth?' + Ext.urlEncode(model);

                                    Ext.Ajax.request({
                                        url: url,
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        success: function (authResponse) {
                                            loginWindow.close();
                                            loginWindow = null;

                                            Ext.Array.forEach(requestsQueue, forEachFunc);
                                            requestsQueue.length = 0;

                                        },
                                        failure: function (error) {
                                            console.log(error);
                                        }
                                    });
                                }
                            });

                            loginWindow.show();
                        }
                    };
               
                    options.callback = customCallback;
                    
                    me.callParent(arguments);
                    return;
                }

                
                

                if (options.failure) {
                    var originalFailHandler = options.failure;
                
                    var failFuncHandler = function (response) {
                        if (response.status != 401) {
                            originalFailHandler(response);
                            return;
                        }

                        requestsQueue.push({
                            options: response.request.options,
                            handler: originalFailHandler
                        });

                        if (loginWindow) {
                            return;
                        }
                        
                        loginWindow = Ext.create('Ilc.window.Login', {
                            handler: function () {

                                var window = this.up('window');
                                var model = Ilc.utils.Forms.extractModel(window.query('textfield'));


                                var url = 'api/auth?' + Ext.urlEncode(model);

                                Ext.Ajax.request({
                                    url: url,
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    success: function (authResponse) {
                                        loginWindow.close();
                                        loginWindow = null;

                                        Ext.Array.forEach(requestsQueue, forEachFunc);
                                        requestsQueue.length = 0;

                                    },
                                    failure: function (error) {
                                        console.log(error);
                                    }
                                });
                            }
                        });

                        loginWindow.show();
                    };
                    options.failure = failFuncHandler;
                }

                me.callParent(arguments);
            }
        });
    }
});


