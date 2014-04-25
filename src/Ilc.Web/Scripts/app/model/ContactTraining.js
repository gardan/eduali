Ext.define('Ilc.model.ContactTraining', {
    extend: 'Ext.data.Model',
    
    fields: ['ids'],
    
    proxy: {
        type: 'rest',
        url: 'api/trainings/1/contacts', // Dummy url, should always be replaced when calling save
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