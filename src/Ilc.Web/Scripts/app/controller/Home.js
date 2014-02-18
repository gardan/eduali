Ext.define('Ilc.controller.Home', {
    extend: 'Ext.app.Controller',
    
    stores: [
        'Questions',
        'Transfers'
    ],

    init: function () {
        var self = this;

        this.listen({
            store: {
                '*': {
                    load: function (store, records, successful, operation) {
                        if (!operation.error || operation.error.status !== 401) {
                            return;
                        }

                        var win = Ext.create('Ext.window.Window', {
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
                                                win.close();
                                                store.reload();
                                            },
                                            failure: function (error) {

                                            }
                                        });


                                    },
                                }
                            ]
                        });

                        win.show();
                        
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