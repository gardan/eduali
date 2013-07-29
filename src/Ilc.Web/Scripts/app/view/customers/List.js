Ext.define('Ilc.view.customers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listcustomers',

    constructor: function () {
        var me = this;

        var customersStore = Ext.create('Ilc.store.Customers');

        var customersGrid = Ext.create('Ext.grid.Panel', {
            store: customersStore,
           
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1
                },
                {
                    dataIndex: 'contactPerson',
                    text: 'Contact',
                    flex: 1,
                    renderer: function (value, metaData) {
                        return value.name;
                    }
                }
            ]

        });

        me.items = [
            {
                xtype: 'button',
                text: 'New customer',
                handler: function (btn, e) {
                    var window = Ext.create('Ilc.view.customers.Create', {
                        hideAction: 'destroy'
                    });

                    window.on('addCustomer', function (sender, model) {
                        me.fireEvent('addCustomer', sender, model, {
                            store: customersStore
                        });
                    });

                    window.show();
                }
            },
            customersGrid
        ];

        me.addEvents(
            'addCustomer'
        );

        me.callParent(arguments);
    }
});