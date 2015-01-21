Ext.define('Ilc.model.create.Offer', {
    extend: 'Ext.data.Model',
    fields: [
        'amount',
        'customerId',
        'paymentDueAt',
        'tos',
        'trainings'
    ],

    proxy: {
        type: 'rest',
        url: 'api/offers',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
})