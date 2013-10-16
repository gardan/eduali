Ext.define('Ilc.view.users.List', {
    extend: 'Ext.container.Container',

    constructor: function () {
        var me = this;

        var usersStore = Ext.create('Ilc.store.Users');

        var usersGrid = Ext.create('Ilc.grid.Users', {
            store: usersStore
        });

        usersGrid.on('itemdblclick', function() {
            var window = Ext.create('Ilc.view.users.Edit', {
                
            }).show();
        });

        me.items = [
            usersGrid
        ];

        usersStore.load();

        me.callParent(arguments);
    }
});
