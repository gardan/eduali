Ext.define('Ilc.view.trainings.Create', {
    extend: 'Ext.window.Window',
    
    constructor: function () {
        var me = this;
        var customersStore = Ext.create('Ilc.store.Customers');


        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            fieldLabel: 'Choose customer'
        });

        var studentsComboBox = {};


        me.items = [
            customerComboBox
        ];
        me.callParent(arguments);
    }
});