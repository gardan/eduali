Ext.define('Ilc.view.offers.Edit', {
    extend: 'Ilc.view.offers.Create',

    defaultValues: {
        active: true
    },


    onSaveClick: function () {

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

        this.callParent(arguments);
    }

});