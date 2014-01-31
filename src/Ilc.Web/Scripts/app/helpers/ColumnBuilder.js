Ext.define('Ilc.helpers.ColumnBuilder', {
    singleton: true,
    

    getUserColCfg: function() {
        return [
            {
                dataIndex: 'userInfo', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                text: Ilc.resources.Manager.getResourceString('common.email'),
                flex: 1,
                renderer: function (value, meta, record) {
                    return record.get('userInfo').email;
                },
                filter: {
                    type: 'string'
                }
            },
            {
                dataIndex: 'userInfo', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                text: Ilc.resources.Manager.getResourceString('common.phone'),
                flex: 1,
                renderer: function (value, meta, record) {
                    return record.get('userInfo').phone;
                },
                filter: {
                    type: 'string'
                }
            },
            {
                dataIndex: 'userInfo', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                text: Ilc.resources.Manager.getResourceString('common.gender'),
                flex: 1,
                renderer: function (value, meta, record) {
                    return record.get('userInfo').genderName;
                },
                filter: {
                    type: 'string'
                }
            }
        ];

    }
});