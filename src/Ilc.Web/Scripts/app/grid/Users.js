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
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.name'),
            dataIndex: 'userInfo',
            flex: 1,
            renderer: function (value) {
                return value.name;
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.email'),
            dataIndex: 'userInfo',
            flex: 1,
            renderer: function (value) {
                return value.email;
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.phone'),
            dataIndex: 'userInfo',
            flex: 1,
            renderer: function (value) {
                return value.phone;
            }
        }
    ],

    initColumns: function () {
        var ret = [
            {
                text: Ilc.resources.Manager.getResourceString('common.username'),
                dataIndex: 'username',
                flex: 1,
                filter: {
                    type: 'string'
                }
            },
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