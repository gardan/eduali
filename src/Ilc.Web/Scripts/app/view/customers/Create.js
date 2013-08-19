Ext.define('Ilc.view.customers.Create', {
    extend: 'Ext.window.Window',
    
    title: Ilc.resources.Manager.getResourceString('common.newCustomer'),

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
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.bankAccount'),
                name: 'bankAccount',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.billingAddress'),
                name: 'billingAddress',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.contactName'),
                name: 'contactName',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.contactEmail'),
                name: 'contactEmail',
                anchor: '100%'
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.add'),
                anchor: '100%',
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