Ext.define('Ilc.view.students.Create', {
    extend: 'Ext.window.Window',
    
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
                    for (var i = 0; i < inputs.length; i++) {
                        var xtype = inputs[i].getXType();
                        var input = inputs[i];

                        switch (xtype) {
                            case 'textfield':
                                model[input.name] = input.getRawValue();
                                break;
                            case 'combobox':
                                
                                if (input.multiSelect) { // multiple items
                                    model[input.name] = [];
                                    for (var z = 0; z < input.lastSelection.length; z++) {
                                        var selectedItem = input.lastSelection[z];
                                        model[input.name].push(selectedItem.data);
                                    }
                                } else {
                                    model[input.name] = input.lastSelection[0].data[input.valueField];
                                }
                                break;
                        default:
                        }
                    }

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
