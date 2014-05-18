Ext.define('Ilc.store.CustomerLogs', {
    extend: 'Ext.data.Store',
    
    //fields: [ 'id', 'createDate', 'body', 'level', 'type'],
    model: 'Ilc.model.CustomerLog',

    constructor: function (args) {
    
        var url = 'api/customers/{customerId}/logs';
    
        url = url.replace('{customerId}', args.customerId);
    
        this.proxy = {
            type: 'rest',
            url: url,
            extraParams: {
                format: 'json'
            },
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalRecords'
            }
        };   
    
        this.callParent(args);
    }    
});