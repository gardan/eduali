Ext.define('Ilc.model.CustomerLog', {
    extend: 'Ext.data.Model',
    
    fields: [
        'id',
        { name: 'createDate', type: 'date' },
        'body',
        'level',
        'type',
        'customerId'
    ],
    
    proxy: {
        type: 'rest',
        url: 'api/logs',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
});