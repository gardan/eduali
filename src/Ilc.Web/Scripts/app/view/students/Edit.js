Ext.define('Ilc.view.students.Edit', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.utils.Forms'
    ],

    constructor: function (config) {
        var me = this;

        var cfgModel = config.model;

        var customersStore = Ext.create('Ilc.store.Customers');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: 'Choose customer'
        });

        customersStore.on('load', function () {
            var store = this;
            
            var studentCustomer = store.findRecord('id', cfgModel.customer.id);
            customerComboBox.select(studentCustomer);
        });


        me.items = [
           {
               xtype: 'textfield',
               fieldLabel: 'Name',
               name: 'name',
               value: cfgModel.name
           },
           customerComboBox,
           {
               xtype: 'button',
               text: 'Create',
               handler: function () {
                   var model = {};
                   var inputs = me.query('textfield');

                   model = Ilc.utils.Forms.extractModel(inputs);
                   model.id = cfgModel.id;
                   me.fireEvent('editStudent', me, model);
               }
           }
        ];
        
        me.addEvents(
            'editStudent'
        );


        me.callParent(arguments);
    }
});