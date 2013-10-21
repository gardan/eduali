Ext.define('Ilc.view.users.List', {
    extend: 'Ext.container.Container',

    xtype: 'listusers',

    constructor: function () {
        var me = this;

        var usersStore = Ext.create('Ilc.store.Users');

        var usersGrid = Ext.create('Ilc.grid.Users', {
            store: usersStore,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.newUser'),
                            handler: function() {
                                var window = Ext.create('Ilc.view.users.Create', {
                                    listeners: {
                                        createuser: function(sender, model) {
                                            me.fireEvent('createuser', sender, model, {
                                                usersStore: usersStore
                                            });
                                        }
                                    }
                                });

                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        usersGrid.on('itemdblclick', function(grid, record) {
            var window = Ext.create('Ilc.view.users.Edit', {
                user: record
            }).show();
        });

        me.items = [
            usersGrid
        ];

        usersStore.load();

        me.addEvents(
            'createuser'
        );

        me.callParent(arguments);
    }
});
