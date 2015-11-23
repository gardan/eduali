Ext.define('Ilc.helpers.ColumnBuilder', {
    singleton: true,
    

    getUserColCfg: function() {
        return [
            {
                text: Ilc.resources.Manager.getResourceString('common.email'),
                dataIndex: 'email',
                flex: 1,
                filter: {
                    type: 'string'
                }
            },
            {
                dataIndex: 'phone', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
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
                dataIndex: 'mobile',
                text: Ilc.resources.Manager.getResourceString('common.mobile'),
                flex: 1,
                renderer: function (value, meta, record) {
                    return record.get('userInfo').mobile;
                },
                filter: {
                    type: 'string'
                }
            },
            {
                dataIndex: 'gender', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                text: Ilc.resources.Manager.getResourceString('common.gender'),
                flex: 1,
                renderer: function (value, meta, record) {
                    return record.get('userInfo').genderName;
                },
                filter: {
                    type: 'string'
                }
            },
            {
                dataIndex: 'dateOfBirth', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                text: Ilc.resources.Manager.getResourceString('common.dateOfBirth'),
                flex: 1,
                renderer: function (value, meta, record) {
                    var formatted = Ext.Date.format(new Date(record.get('userInfo').dateOfBirth), Ilc.resources.Manager.getResourceString('formats.extjsdateonly'));
                    return formatted;
                },
                filter: {
                    type: 'string'
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.address'),
                dataIndex: 'address',
                renderer: function (value, meta, record) {
                    return record.get('userInfo').address;
                },
                flex: 1,
                filter: {
                    type: 'string'
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.city'),
                dataIndex: 'city',
                renderer: function (value, meta, record) {
                    return record.get('userInfo').city;
                },
                flex: 1,
                filter: {
                    type: 'string'
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.country'),
                dataIndex: 'country',
                renderer: function (value, meta, record) {
                    return record.get('userInfo').country;
                },
                flex: 1,
                filter: {
                    type: 'string'
                }
            },
        ];
    }
});