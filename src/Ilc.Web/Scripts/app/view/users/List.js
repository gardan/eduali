Ext.define('Ilc.view.users.List', {
    extend: 'Ext.container.Container',

    xtype: 'listusers',

    initComponent: function () {
        var me = this;

        var usersStore = Ext.create('Ilc.store.Users');

        var usersGrid = Ext.create('Ilc.grid.Users', {
            store: usersStore,
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: usersStore,
                    dock: 'bottom'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.newUser'),
                            iconCls: 'icon-add',
                            cls: 'clean-button',
                            handler: function() {
                                var window = Ext.create('Ilc.view.users.Create', {
                                    listeners: {
                                        createuser: function(sender, model) {
                                            me.fireEvent('createuser', sender, model, {
                                                usersStore: usersStore
                                            });
                                        },
                                        useradded: function() {
                                            usersStore.reload();
                                        },
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
                user: record,
                listeners: {
                    'useredited': function() {
                        usersStore.reload();
                    }
                }
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
