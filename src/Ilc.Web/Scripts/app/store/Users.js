Ext.define('Ilc.store.Users', {
    extend: 'Ext.data.Store',

    model: 'Ilc.model.User',
    // fields: ['id', 'username', 'userInfo'],

    constructor: function (args) {
        var me = this;

        var extraParams = {
            format: 'json'
        };

        if (args && args.claims != null) {
            extraParams.claims = args.claims;
        }

        me.proxy = {
            type: 'rest',
            url: 'api/users',
            extraParams: extraParams,
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalRecords'
            }
        };

        me.callParent(arguments);
    },
});