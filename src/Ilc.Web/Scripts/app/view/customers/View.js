Ext.define('Ilc.view.customers.View', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.view.customers.Edit',
        'Ilc.view.customers.EditFinancial',
        'Ilc.view.customers.contacts.List',
        'Ilc.view.customerLogs.List'
    ],
    
    layout: 'anchor',

    bodyPadding: 0,
    width: 800,
    customer: null,
   

    initComponent: function() {
        var me = this;
        
        var contactsStore = Ext.create('Ilc.store.Contacts', {
            customerId: me.customer.id
        });

        var logsStore = Ext.create('Ilc.store.CustomerLogs', {
            customerId: me.customer.id
        });
        me.title = me.customer.name; // set the name of the dialog to the name of the Customer
        me.items = [
            {
                
                xtype: 'tabpanel',
                anchor: '100%, 100%',
                items: [
                    {
                        title: Ilc.resources.Manager.getResourceString('common.general'),
                        xtype: 'editcustomer',
                        customer: me.customer,

                        listeners: {
                            'cancelclicked': function() {
                                me.close();
                            },
                            'editcomplete': function() {
                                me.fireEvent('reloadcustomers');
                            }
                        }
                    },
                    {
                        xtype: 'contactslist',
                        title: Ilc.resources.Manager.getResourceString('common.customerContacts'),
                        store: contactsStore,
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'icon-add',
                                        cls: 'clean-button',
                                        text: Ilc.resources.Manager.getResourceString('common.addCustomerContact'),
                                        handler: function() {
                                            var window = Ext.create('Ilc.view.customers.contacts.Create', {
                                                customer: me.customer,
                                                listeners: {
                                                    contactcreated: function() {
                                                        contactsStore.reload();
                                                    }
                                                }
                                            }).show();
                                        }
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            'updatecomplete': function() {
                                contactsStore.reload();
                                me.fireEvent('reloadcustomers');
                            }
                        }
                    },
                    {
                        xtype: 'logslist',
                        title: Ilc.resources.Manager.getResourceString('common.customerRelationship'),
                        customerId: me.customer.id,
                        store: logsStore
                    }
                ]
            }
        ];

        me.addEvents(
            'reloadcustomers'
        );

        contactsStore.load();
        logsStore.load();

        me.callParent(arguments);
    }
});