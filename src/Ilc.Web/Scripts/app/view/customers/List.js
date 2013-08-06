Ext.define('Ilc.view.customers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listcustomers',

    requires: [
        'Ext.util.Point'
    ],

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
                },
                {
                    dataIndex: 'bankAccount',
                    title: 'Bank account',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/edit.png',
                            scope: me,
                            tooltip: 'Edit',
                            handler: function(grid, rowIndex, colIndex, item, e, record) {
                                var editWindow = Ext.create('Ilc.view.customers.Edit', {
                                    closeAction: 'destroy',
                                    model: record.data
                                });

                                editWindow.on('editCustomer', function (sender, model) {
                                    me.fireEvent('editCustomer', sender, model, {
                                        store: customersStore
                                    });
                                });

                                editWindow.show();
                            }
                        },
                        {
                            icon: 'images/web/remove.png',
                            scope: me,
                            tooltip: 'Delete',
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                me.fireEvent('deleteCustomer', me, {
                                    id: record.data.id
                                }, {
                                    store: customersStore
                                });
                            }
                        }
                    ]
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
            'addCustomer',
            'editCustomer',
            'deleteCustomer'
        );

        me.callParent(arguments);
    }
});