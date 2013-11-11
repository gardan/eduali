Ext.define('Ilc.store.statistics.Customers', {
    extend: 'Ext.data.Store',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'trainingsNo',
            type: 'int'
        }
    ],

    proxy: {
        type: 'rest',
        url: 'api/statistics/customerTrainings',
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