Ext.define('Ilc.store.Companies', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name'],
    
    proxy: {
        type: 'rest',
        url: 'api/companies',
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