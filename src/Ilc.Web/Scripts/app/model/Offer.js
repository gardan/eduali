Ext.define('Ilc.model.Offer', {
    extend: 'Ext.data.Model',
    fields: [
        'customer', 'active', 'createDate', 'creator', 'trainings', 'amount', 'sentAt', 'accepted',
        'paymentDueAt', 'tos', 'payed'
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
});