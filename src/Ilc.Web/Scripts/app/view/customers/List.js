Ext.define('Ilc.view.customers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listcustomers',

    requires: [
        'Ext.util.Point',
        'Ext.ux.grid.JsvFiltersFeature'
    ],

    constructor: function () {
        var me = this;

        var customersStore = Ext.create('Ilc.store.Customers');

        var filters = {
            ftype: 'jsvfilters',
            // encode and local configuration options defined previously for easier reuse
            // encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
        };

        var customersGrid = Ext.create('Ext.grid.Panel', {
            store: customersStore,
            features: [filters],
            columns: [
                {
                    dataIndex: 'name',
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'contactPerson',
                    text: Ilc.resources.Manager.getResourceString('common.contact'),
                    sortable: false,
                    flex: 1,
                    renderer: function (value, metaData) {
                        return value.name;
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'bankAccount',
                    text: Ilc.resources.Manager.getResourceString('common.bankAccount'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/edit.png',
                            scope: me,
                            tooltip: Ilc.resources.Manager.getResourceString('common.edit'),
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
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
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
                text: Ilc.resources.Manager.getResourceString('common.newCustomer'),
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