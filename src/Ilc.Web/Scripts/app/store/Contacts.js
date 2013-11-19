Ext.define('Ilc.store.Contacts', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'firstName', 'lastName', 'isTrainingContact', 'isMain'],
    
    // data: [
    //     { id: 1, firstName: 'Ionelee', lastName: 'Vasileee', isTrainingContact: true, isMain: true }
    // ],
    
    constructor: function(args) {
        var me = this;

        me.proxy = {
            type: 'rest',
            url: 'api/customers/' + args.customerId + '/contacts',
            extraParams: {
                format: 'json'
            },
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalRecords'
            }
        };

        me.callParent(arguments);
    }
});