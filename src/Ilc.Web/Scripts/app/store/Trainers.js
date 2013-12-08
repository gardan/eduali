Ext.define('Ilc.store.Trainers', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'userInfo', 'subjects'],

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