Ext.define('Ilc.store.Contacts', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'firstName', 'lastName', 'name', 'isTrainingContact', 'isMain', 'user'],
    
    // data: [
    //     { id: 1, firstName: 'Ionelee', lastName: 'Vasileee', isTrainingContact: true, isMain: true }
    // ],
    
    customerId: null,
    isTrainingContact: null,
    isMain: null,

    updateCustomerId: function(customerId) {
        this.getProxy().url = 'api/customers/' + customerId + '/contacts';
    },

    constructor: function(args) {
        var me = this;

        var customerId = args.customerId == null ? 0 : args.customerId;
        var isTrainingContact = args.isTrainingContact == null ? null : args.isTrainingContact;

        var extraParams = {
            format: 'json'
        };

        if (isTrainingContact != null) {
            extraParams.isTrainingContact = isTrainingContact;
        }

        me.proxy = {
            type: 'rest',
            url: 'api/customers/' + customerId + '/contacts',
            extraParams: extraParams,
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalRecords'
            }
        };

        me.callParent(arguments);
    }
});