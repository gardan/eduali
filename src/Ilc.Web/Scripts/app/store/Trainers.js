Ext.define('Ilc.store.Trainers', {
    extend: 'Ext.data.Store',
    
    model: 'Ilc.model.Trainer',

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