Ext.define('Ilc.store.Subjects', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    
    // data: [
    //     { id: 1, name: 'English' },
    //     { id: 2, name: 'Romanian' }
    // ]
    
    proxy: {
        type: 'rest',
        url: 'api/subjects',
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