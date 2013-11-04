Ext.define('Ilc.view.statusDefinitions.List', {
    extend: 'Ext.container.Container',

    initComponent: function () {
        var me = this;

        var store = Ext.create('Ilc.store.StatusDefinitions');

        var statusDefinitionsGrid = Ext.create('Ilc.grid.StatusDefinitions', {
            store: store
        });

        statusDefinitionsGrid.on('itemdblclick', function (grid, record) {
            var window = Ext.create('Ilc.view.statusDefinitions.Edit', {
                store: store,
                statusDefinition: record
            });
            window.show();
        });

        me.items = [
            statusDefinitionsGrid
        ];

        store.load();
        me.callParent(arguments);
    }
});