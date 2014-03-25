Ext.define('Ilc.store.TrainingSystems', {
    extend: 'Ext.data.Store',
    requires: [
        'Ilc.model.GradingSystem'
    ],

    model: 'Ilc.model.GradingSystem',
    
    // data: [
    //     { id: 1, name: 'European Union' },
    //     { id: 2, name: 'Toeffel' }
    // ],
    
    proxy: {
        type: 'rest',
        url: 'api/gradingsystems',
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