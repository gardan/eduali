Ext.define('Ilc.grid.Users', {
    extend: 'Ext.grid.Panel',

    features: [
        {
            ftype: 'jsvfilters',
            local: false,   // defaults to false (remote filtering)
        }
    ],

    columns: [
        {
            text: Ilc.resources.Manager.getResourceString('common.username'),
            dataIndex: 'username',
            flex: 1,
            filter: {
                type: 'string'
            }
        }
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});