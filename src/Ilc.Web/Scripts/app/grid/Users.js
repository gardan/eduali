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
        ,
        {
            text: Ilc.resources.Manager.getResourceString('common.name'),
            dataIndex: 'userInfo',
            flex: 1,
            renderer: function (value) {
                return value.name;
            }
        }
        ,
        {
            text: Ilc.resources.Manager.getResourceString('common.email'),
            dataIndex: 'userInfo',
            flex: 1,
            renderer: function (value) {
                return value.email;
            }
        }
        ,
        {
            text: Ilc.resources.Manager.getResourceString('common.phone'),
            dataIndex: 'userInfo',
            flex: 1,
            renderer: function (value) {
                return value.phone;
            }
        }
    ],

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});