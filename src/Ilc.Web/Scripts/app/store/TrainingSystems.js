Ext.define('Ilc.store.TrainingSystems', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    
    data: [
        { id: 1, name: 'European Union' },
        { id: 2, name: 'Toeffel' }
    ]
});