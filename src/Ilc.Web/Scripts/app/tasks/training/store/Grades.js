Ext.define('Ilc.tasks.training.store.Grades', {
    extend: 'Ext.data.Store',
    
    fields: ['text', 'order'],
    data: {
        data: [
            { id: 1, text: 'A1', order: 1 },
            { id: 2, text: 'A2', order: 2 },
            { id: 3, text: 'B1', order: 3 },
            { id: 4, text: 'B2', order: 4 },
            { id: 5, text: 'C1', order: 5 },
            { id: 6, text: 'C2', order: 6 }
        ]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});