Ext.define('Ilc.view.offers.Edit', {
    extend: 'Ilc.view.offers.Create',

    defaultValues: {
        sentAtVisible: true,
        acceptedByCustomerVisible: true
    },


    onSaveClick: function () {
        var model = Ilc.utils.Forms.extractModel(R.concat(this.query('textfield'), this.query('checkbox'))),
            createOffer = Ext.create('Ilc.model.edit.Offer', model);

        createOffer.set('trainings', R.map(R.get('id'), model.trainings));
        createOffer.set('id', this.model.get('id'));

        createOffer.save({
            success: function () {
                Ext.ux.Router.redirect('offers');
            }
        });
    },

    customersLoaded: function () {
        this.getCustomersDropDown().setValue(this.defaultValues.customer.id);
    },

    trainingsLoaded: function() {
        this.getTrainingsDropDown().setValue(this.defaultValues.trainings);
    },

    initComponent: function () {

        this.defaultValues.active = this.model.get('active');
        this.defaultValues.amount = this.model.get('amount');
        this.defaultValues.trainings = R.map(R.get('id'), this.model.get('trainings'));
        this.defaultValues.customer = this.model.get('customer');
        this.defaultValues.tos = this.model.get('tos');
        this.defaultValues.paymentDueAt = this.model.get('paymentDueAt');
        this.defaultValues.accepted = this.model.get('accepted');
        this.defaultValues.sentAt= this.model.get('sentAt');

        this.callParent(arguments);
    }

});