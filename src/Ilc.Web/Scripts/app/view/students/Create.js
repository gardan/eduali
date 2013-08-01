Ext.define('Ilc.view.students.Create', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.utils.Forms'
    ],

    constructor: function () {
        var me = this;

        var customersStore = Ext.create('Ilc.store.Customers');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: 'Choose customer'
        });

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name'
            },
            customerComboBox,
            {
                xtype: 'button',
                text: 'Create',
                handler: function () {
                    var model = {};
                    var inputs = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(inputs);

                    me.fireEvent('addStudent', me, model);
                }
            }
        ];


        me.addEvents(
            'addStudent'
        );

        me.callParent(arguments);
    }
});
