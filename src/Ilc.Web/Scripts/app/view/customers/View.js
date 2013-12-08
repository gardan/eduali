Ext.define('Ilc.view.customers.View', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.view.customers.Edit',
        'Ilc.view.customers.contacts.List'
    ],
    
    bodyPadding: 0,
    width: 800,
    customer: null,

    initComponent: function() {
        var me = this;

        var contactsStore = Ext.create('Ilc.store.Contacts', {
            customerId: me.customer.id
        });

        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'General',
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
                        title: 'Contacts',
                        store: contactsStore,
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                items: [
                                    {
                                        text: 'New contact',
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
                    }
                ]
            }
        ];

        me.addEvents(
            'reloadcustomers'
        );

        contactsStore.load();

        me.callParent(arguments);
    }
});