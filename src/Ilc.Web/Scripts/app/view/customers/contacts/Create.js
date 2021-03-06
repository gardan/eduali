﻿Ext.define('Ilc.view.customers.contacts.Create', {
    extend: 'Ext.window.Window',
    xtype: 'createcontactwindow',


    layout: 'anchor',
    title: Ilc.resources.Manager.getResourceString('common.newCustomerContact'),
    customer: null,

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    items: [
        {
            fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
            name: 'firstName'
        },
        {
            fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
            name: 'lastName'
        },
        {
            fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
            name: 'email'
        },
        {
            fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
            name: 'phone'
        }
    ],
    
    buttons: [
        {
            text: Ilc.resources.Manager.getResourceString('common.add'),
            handler: function(btn) {
                var me = btn.up().up();

                var model = {};

                var textboxes = me.query('field');

                model = Ilc.utils.Forms.extractModel(textboxes);
                
                var inputs = me.query('textfield');
                var model = Ilc.utils.Forms.extractModel(inputs);
                model.customerId = me.customer.id;

                console.log(model);

                var fields = ['firstName', 'lastName', 'email'];
                me.validateWrapper(function() {
                    me.fireEvent('createcontact', me, model);
                }, fields, textboxes, model);
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.cancel'),
            handler: function(btn) {
                var me = btn.up().up();
                me.close();
            }
        }
    ],

    contactCreated: function() {
        this.fireEvent('contactcreated');
        this.close();
    },

    initComponent: function() {
        var me = this;

        me.addEvents(
            'createcontact',
            'contactcreated'
        );

        me.callParent(arguments);
    }
});