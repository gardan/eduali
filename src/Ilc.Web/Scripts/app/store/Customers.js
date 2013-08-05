Ext.define('Ilc.store.Customers', {
    extend: 'Ext.data.Store',
    
    model: 'Ilc.model.Customer',
    
    autoLoad: true,
    
    proxy: {
        type: 'rest',
        url: 'api/customers',
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