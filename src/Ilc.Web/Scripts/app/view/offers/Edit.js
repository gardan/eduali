Ext.define('Ilc.view.offers.Edit', {
    extend: 'Ilc.view.offers.Create',

    defaultValues: {
        active: true
    },

    initComponent: function () {
        this.defaultValues.active = this.model.get('active');
        this.callParent(arguments);
    }

});