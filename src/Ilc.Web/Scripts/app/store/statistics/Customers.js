Ext.define('Ilc.store.statistics.Customers', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'trainingsNo'],
    
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'api/statistics/customerTrainings',
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