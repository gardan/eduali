Ext.define('Ilc.LoginManager', {
    singleton: true,
    
    loginWindow: null,
    requestsQueue: [],
    
    _forEachFunc: function (item) {
        if (item.options.callback) {
            item.options.callback = item.handler;
        } else {
            item.options.failure = item.handler;
        }

        Ext.Ajax.request(item.options);
    },

    onAfterLoginSuccess: function () {
        Ilc.Configuration.init();
    },

    _initLoginWindow: function() {
        return Ext.create('Ilc.window.Login', {
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
                        Ilc.LoginManager.loginWindow.close();
                        Ilc.LoginManager.loginWindow = null;

                        Ext.Array.forEach(Ilc.LoginManager.requestsQueue, Ilc.LoginManager._forEachFunc);
                        Ilc.LoginManager.requestsQueue.length = 0;
                        Ilc.LoginManager.onAfterLoginSuccess();
                    },
                    failure: function (error) {
                        console.log(error);
                    }
                });
            }
        });
    },

    constructor: function () {
        // Override Ext.data.Connection
        Ext.override(Ext.data.Connection, {
            request: function (options) {
                var me = this;
                if (options.callback) {
                    var originalHandler = options.callback;
                    // 
                    var customCallback = function (opts, success, response) {
                        if (response.status != 401) {
                            originalHandler.apply(this, arguments);
                        } else {

                            Ilc.LoginManager.requestsQueue.push({
                                options: opts,
                                handler: originalHandler
                            });

                            if (Ilc.LoginManager.loginWindow) {
                                return;
                            }

                            Ilc.LoginManager.loginWindow = Ilc.LoginManager._initLoginWindow();

                            Ilc.LoginManager.loginWindow.show();
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
                            originalFailHandler.apply(this, arguments);
                            return;
                        }

                        Ilc.LoginManager.requestsQueue.push({
                            options: response.request.options,
                            handler: originalFailHandler
                        });

                        if (Ilc.LoginManager.loginWindow) {
                            return;
                        }

                        Ilc.LoginManager.loginWindow = Ilc.LoginManager._initLoginWindow();

                        Ilc.LoginManager.loginWindow.show();
                    };
                    options.failure = failFuncHandler;
                }

                me.callParent(arguments);
            }
        });
    }
});