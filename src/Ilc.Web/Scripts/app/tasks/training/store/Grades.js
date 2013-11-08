Ext.define('Ilc.tasks.training.store.Grades', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'order'],

    // data: {
    //     data: [
    //         { id: 1, name: 'A1', order: 1 },
    //         { id: 2, name: 'A2', order: 2 },
    //         { id: 3, name: 'B1', order: 3 },
    //         { id: 4, name: 'B2', order: 4 },
    //         { id: 5, name: 'C1', order: 5 },
    //         { id: 6, name: 'C2', order: 6 }
    //     ]
    // },
    
    proxy: {
        type: 'rest',
        url: 'api/grades',
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