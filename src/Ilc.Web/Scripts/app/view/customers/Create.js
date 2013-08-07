Ext.define('Ilc.view.customers.Create', {
    extend: 'Ext.window.Window',
    
    title: 'Create new customer',

    requires: [
        'Ilc.utils.Forms'
    ],
    layout: 'anchor',
    modal: true,
    bodyPadding: 10,
    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Bank account',
                name: 'bankAccount',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Billing address',
                name: 'billingAddress',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Contact name',
                name: 'contactName',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Contact email',
                name: 'contactEmail',
                anchor: '100%'
            },
            {
                xtype: 'button',
                text: 'Create',
                handler: function (button, e) {
                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);

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