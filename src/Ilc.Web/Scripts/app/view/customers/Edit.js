Ext.define('Ilc.view.customers.Edit', {
    extend: 'Ext.panel.Panel',
    xtype: 'editcustomer',

    title: Ilc.resources.Manager.getResourceString('common.customer'),

    requires: [
        'Ilc.utils.Forms'
    ],

    customer: null,

    bodyPadding: 10,
    
    editComplete: function () {
        this.fireEvent('editcomplete');
        this.fireEvent('cancelclicked');
    },

    initComponent: function () {       
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                value: me.customer.name
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.bankAccount'),
                name: 'bankAccount',
                value: me.customer.bankAccount
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.billingAddress'),
                name: 'billingAddress',
                value: me.customer.billingAddress
            }
            
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function (button, e) {
                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);
                    model.id = me.customer.id;
                    // raise the event
                    me.fireEvent('edit', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function() {
                    me.fireEvent('cancelclicked', me);
                }
            }
        ];

        me.addEvents(
            'edit',
            'editcomplete',
            'cancelclicked'
        );

        me.callParent(arguments);
    }
});