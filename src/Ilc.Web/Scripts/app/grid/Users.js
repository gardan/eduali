Ext.define('Ilc.grid.Users', {
    extend: 'Ext.grid.Panel',

    features: [
        {
            ftype: 'jsvfilters',
            local: false,   // defaults to false (remote filtering)
        }
    ],

    initColumns: function () {
        var ret = [
            {
                text: Ilc.resources.Manager.getResourceString('common.name'),
                dataIndex: 'userInfo',
                flex: 1,
                renderer: function (value) {
                    return value.name;
                }
            }
        ];
        
        ret = ret.concat(Ilc.helpers.ColumnBuilder.getUserColCfg());

        return ret;
    },

    initComponent: function () {
        var me = this;

        me.columns = me.initColumns();

        me.callParent(arguments);
    }
});