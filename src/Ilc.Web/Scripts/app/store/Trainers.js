Ext.define('Ilc.store.Trainers', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'phone', 'address'],

    proxy: {
        type: 'rest',
        url: 'api/trainers',
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