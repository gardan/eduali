Ext.define('Ilc.store.statistics.Spendings', {
    extend: 'Ext.data.Store',

    // fields: ['customerName', 'subjectName', 'trainingCompositeId', '', 'price', 'spendings'],

    fields: [
        {
            name: 'label',
            convert: function (v, record) {
                return record.data.customerName + '/' + record.data.subjectName + '/' + record.data.trainingCompositeId;
            }
        },
        {
            name: 'price'
        },
        {
            name: 'spendings'
        },
        {
            name: 'customerName'
        },
        {
            name: 'subjectName'
        },
        {
            name: 'trainingCompositeId'
        }
    ],

    proxy: {
        type: 'rest',
        url: 'api/statistics/spendings',
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