Ext.define('Ilc.store.Users', {
    extend: 'Ext.data.Store',

    fields: ['id', 'username', 'userInfo'],

    claims: '',

    constructor: function (args) {
        var me = this;

        me.claims = args.claims;

        var extraParams = {
            format: 'json'
        };

        if (me.claims != '') {
            extraParams.claims = me.claims;
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