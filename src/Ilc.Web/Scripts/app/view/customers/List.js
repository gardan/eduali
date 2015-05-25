Ext.define('Ilc.view.customers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listcustomers',

    requires: [
        'Ext.util.Point',
        'Ext.ux.grid.JsvFiltersFeature',
        'Ilc.AsyncHelpers'
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
            dockedItems: [
                {
                    pageSize: 10,
                    xtype: 'pagingtoolbar',
                    store: customersStore,
                    dock: 'bottom',
                    displayMsg: 'Displaying customers {0} - {1} of {2}'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-add',
                            cls: 'clean-button',
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
                        }
                    ]
                }
            ],
            columns: [
                {
                    dataIndex: 'id',
                    text: Ilc.resources.Manager.getResourceString('common.id'),
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'customerId',
                    text: Ilc.resources.Manager.getResourceString('common.customerId'),
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'name',
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'billingAddress',
                    text: Ilc.resources.Manager.getResourceString('common.billingAddress'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },

                {
                    dataIndex: 'postcode',
                    text: Ilc.resources.Manager.getResourceString('common.postcode'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'city',
                    text: Ilc.resources.Manager.getResourceString('common.city'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'country',
                    text: Ilc.resources.Manager.getResourceString('common.country'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'phone',
                    text: Ilc.resources.Manager.getResourceString('common.phone'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'bankName',
                    hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                    text: Ilc.resources.Manager.getResourceString('common.bankName'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'bankAccount',
                    hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                    text: Ilc.resources.Manager.getResourceString('common.bankAccount'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'fiscalCode',
                    hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                    text: Ilc.resources.Manager.getResourceString('common.fiscalCode'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'commerceNumber',
                    hidden: !Ilc.Configuration.claimExists('read-customer-financial'),
                    text: Ilc.resources.Manager.getResourceString('common.commerceNumber'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },

                {
                    dataIndex: 'contactPerson',
                    text: Ilc.resources.Manager.getResourceString('common.contact'),
                    flex: 1,
                    renderer: function (value, metaData) {
                        return value ? value.name : '';
                    },
                    filter: {
                        type: 'string'
                    }
                },
             
                {
                    dataIndex: 'contactPerson',
                    text: Ilc.resources.Manager.getResourceString('common.phoneContact'),
                    flex: 1,
                    renderer: function (value, metaData) {
                        return value ? value.user.userInfo.phone : '';
                    },
                    filter: {
                        type: 'string'
                    }
                },

                {
                    xtype: 'actioncolumn',
                    text: Ilc.resources.Manager.getResourceString('common.actions'),
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/remove.png',
                            scope: me,
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                Ilc.AsyncHelpers.confirmModal()
                                .then(function() {
                                    me.fireEvent('deleteCustomer', me, {
                                            id: record.data.id
                                        }, {
                                            store: customersStore
                                        });
                                })
                            }
                        }
                    ]
                }
            ]

        });

        customersGrid.on('itemdblclick', function (grid, record) {
            var editWindow = Ext.create('Ilc.view.customers.View', {
                closeAction: 'destroy',
                customer: record.data
            });

            editWindow.on('reloadcustomers', function() {
                customersStore.load();
            });

            editWindow.show();
        });

        me.items = [
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