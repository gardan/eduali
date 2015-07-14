Ext.define('Ilc.model.Offer', {
    extend: 'Ext.data.Model',
    
    requires: ['Ilc.model.edit.Offer'],

    fields: [
        'customer', 'active', 'createDate', 'creator', 'trainings', 'amount', 'sentAt', 'accepted',
        'paymentDueAt', 'tos', 'payed'
    ],

    getEditModel: function() {
        return Ext.create('Ilc.model.edit.Offer', {
            'id': this.get('id'),
            'active': this.get('active'),
            'payed': this.get('payed'),
            'sentAt': this.get('sentAt'),
            'accepted': this.get('accepted'),
            'amount': this.get('amount'),
            'customerId': this.get('customer').id,
            'paymentDueAt': this.get('paymentDueAt'),
            'tos': this.get('tos'),
            'trainings': R.map(R.prop('id'), this.get('trainings'))
        });
    },

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