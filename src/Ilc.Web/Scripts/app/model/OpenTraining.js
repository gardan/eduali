Ext.define('Ilc.model.OpenTraining', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'name',
        'trainerName',
        'startDate',
        'endDate',
        'joined'
    ],

    proxy: {
        type: 'rest',
        url: 'api/opentrainings',
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