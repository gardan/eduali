Ext.define('Ilc.grid.Claims', {
    extend: 'Ext.grid.Panel',

    columns: [
        {
            text: Ilc.resources.Manager.getResourceString('common.name'),
            dataIndex: 'name',
            flex: 1
        }
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});