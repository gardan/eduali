Ext.define('Ilc.view.customers.View', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.view.customers.Edit'
    ],

    width: 600,
    bodyPadding: 0,

    customer: null,

    initComponent: function() {
        var me = this;

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
                    }
                ]
            }
        ];

        me.addEvents(
            'reloadcustomers'
        );

        me.callParent(arguments);
    }
});