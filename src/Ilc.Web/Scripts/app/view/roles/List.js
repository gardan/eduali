Ext.define('Ilc.view.roles.List', {
    extend: 'Ext.container.Container',

    constructor: function () {
        var me = this;

        var rolesStore = Ext.create('Ilc.store.Roles');

        var usersGrid = Ext.create('Ilc.grid.Roles', {
            store: rolesStore,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: '',
                            handler: function() {
                                var window = Ext.create('Ilc.view.roles.Create', {
                                    rolesStore: rolesStore
                                });

                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        usersGrid.on('itemdblclick', function (grid, record) {
            var window = Ext.create('Ilc.view.roles.Edit', {
                role: record
            }).show();
        });

        me.items = [
            usersGrid
        ];

        rolesStore.load();

        me.callParent(arguments);
    }
});
