Ext.define('Ilc.grid.Users', {
    extend: 'Ext.grid.Panel',

    columns: [
        {
            text: Ilc.resources.Manager.getResourceString('common.username'),
            dataIndex: 'username',
            flex: 1
        }
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});