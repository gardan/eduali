Ext.define('Ilc.view.customers.Create', {
    extend: 'Ext.window.Window',
    
    title: 'Create new customer',

    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Bank account',
                name: 'bankAccount'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Billing address',
                name: 'billingAddress'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Contact name',
                name: 'contactName'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Contact email',
                name: 'contactEmail'
            },
            {
                xtype: 'button',
                text: 'Create',
                handler: function (button, e) {
                    var model = {};

                    var textboxes = me.query('textfield');

                    for (var i = 0; i < textboxes.length; i++) {
                        var textbox = textboxes[i];
                        model[textbox.name] = textbox.getRawValue();
                    }

                    // raise the event
                    me.fireEvent('addCustomer', me, model);
                }
            }
        ];


        me.addEvents(
            'addCustomer'
        );

        me.callParent(arguments);
    }
});