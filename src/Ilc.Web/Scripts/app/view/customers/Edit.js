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
        debugger
        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                value: me.customer.name
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.billingAddress'),
                name: 'billingAddress',
                value: me.customer.billingAddress
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.postcode'),
                name: 'postcode',
                value: me.customer.postcode
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.city'),
                name: 'city',
                value: me.customer.city
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.country'),
                name: 'country',
                value: me.customer.country
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                name: 'phone',
                value: me.customer.phone
            },
            {
                xtype: 'textfield',
                hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                fieldLabel: Ilc.resources.Manager.getResourceString('common.bankName'),
                name: 'bankName',
                value: me.customer.bankName
            },
            {
                xtype: 'textfield',
                hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                fieldLabel: Ilc.resources.Manager.getResourceString('common.bankAccount'),
                name: 'bankAccount',
                value: me.customer.bankAccount
            },

            {
                xtype: 'textfield',
                hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                fieldLabel: Ilc.resources.Manager.getResourceString('common.fiscalCode'),
                name: 'fiscalCode',
                value: me.customer.fiscalCode,
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                fieldLabel: Ilc.resources.Manager.getResourceString('common.commerceNumber'),
                name: 'commerceNumber',
                value: me.customer.commerceNumber,
                anchor: '100%'
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