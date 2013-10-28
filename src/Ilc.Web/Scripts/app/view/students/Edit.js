Ext.define('Ilc.view.students.Edit', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.student'),

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
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer')
        });

        customersStore.on('load', function () {
            var store = this;

            var studentCustomer = store.findRecord('id', cfgModel.customer.id);
            customerComboBox.select(studentCustomer);
        });


        me.items = [
           {
               xtype: 'textfield',
               fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
               name: 'name',
               value: cfgModel.name
           },
        ];

            me.buttons = [
            {

                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.edit'),
                handler: function () {
                    var model = {};
                    var inputs = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = cfgModel.id;
                    me.fireEvent('editStudent', me, model);
                }
            },
{
    text: Ilc.resources.Manager.getResourceString('common.cancel'),
    handler: function () {
        me.close();
    }
}
        ];

        me.addEvents(
            'editStudent'
        );


        me.callParent(arguments);
    }
});