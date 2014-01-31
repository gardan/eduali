Ext.define('Ilc.store.Genders', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name'],
    
    proxy: {
        type: 'rest',
        url: 'api/genders',
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