Ext.define('Ilc.controller.Home', {
    extend: 'Ext.app.Controller',
    
    stores: [
        'Questions',
        'Transfers'
    ],

    init: function () {
        var self = this;

        var storesQueue = [];
        var loginWindow = null;

        this.listen({
            store: {
                '*': {
                    load: function (store, records, successful, operation) {
                        debugger;
                        if (!operation.error || operation.error.status !== 401) {
                            return;
                        }

                        storesQueue.push(store);

                        if (loginWindow) {
                            return;
                        }

                        loginWindow = Ext.create('Ext.window.Window', {
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'email',
                                    fieldLabel: 'Email'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'password',
                                    fieldLabel: 'Password',
                                    inputType: 'password'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Login',
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
                                            success: function (response) {
                                                loginWindow.close();
                                                loginWindow = null;

                                                Ext.Array.forEach(storesQueue, function (queuedStore) {
                                                    debugger;
                                                    queuedStore.reload();
                                                });
                                                storesQueue.length = 0;
                                            },
                                            failure: function (error) {

                                            }
                                        });


                                    },
                                }
                            ]
                        });

                        loginWindow.show();
                        
                    }
                }
            }
        });

        this.control({
            '#main-nav-toolbar button': {
                click: this.onMainNavClick
            },
            'viewport': {
                menuclick: this.onMainNavClick
            }
        });
    },
    
    onMainNavClick: function (btn) {
        var routeId = '';
        if (btn.itemId == undefined) { // check if it is a menu button
            return;
        }
        routeId = btn.itemId.substring(5);
        Ext.Router.redirect(routeId === 'evaluation' ? '' : routeId);
    }
});