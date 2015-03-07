Ext.define('Ilc.store.StatusDefinitions', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'weight'],

    proxy: {
        type: 'rest',
        url: 'api/statusDefinitions',
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