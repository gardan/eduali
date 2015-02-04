Ext.define('Ilc.model.edit.Offer', {
    extend: 'Ext.data.Model',
    fields: [
        'active',
        'payed',
        'sentAt',
        'accepted',
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