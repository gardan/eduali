Ext.define('Ilc.view.offers.List', {
    extend: 'Ext.container.Container',

    xtype: 'listoffers',

    getOffersStore: function () {
        Ext.define('Offer', {
            extend: 'Ext.data.Model',
            fields: [
                'customer', 'active', 'createDate', 'creator', 'training', 'amount', 'sentToCustomer', 'accepted',
                'dueDate', 'tos', 'payed'
            ]
        });
        return Ext.create('Ext.data.Store', {
            model: 'Offer',
            
            proxy: {
                type: 'rest',
                url: 'api/offers',
                extraParams: {
                    format: 'json'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalRecords'
                }
            }
        });
    },

    onOfferDblClick: function() {
        Ext.ux.Router.redirect('offers/1');
    },

    getOffersGrid: function () {
        var me = this;
        return Ext.create('Ext.grid.Panel', {
            listeners: {
                itemdblclick: this.onOfferDblClick
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Create offer',
                            iconCls: 'icon-add',
                            cls: 'clean-button',
                            handler: function() {
                                Ext.ux.Router.redirect('offers/create');
                            }
                        }
                    ]
                }
            ],
            store: this.getOffersStore().load(),
            columns: [
                {
                    text: Ilc.resources.Manager.getResourceString('common.customer'),
                    dataIndex: 'customer',
                    flex: 1,
                    renderer: function(value) {
                        return value.name;
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.active'),
                    dataIndex: 'active',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.createDate'),
                    dataIndex: 'createDate',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.creator'),
                    dataIndex: 'creator',
                    flex: 1,
                    renderer: function (value) {
                        debugger;
                        return value.fullName;
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'trainingIds',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'amount',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'sentToCustomer',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'accepted',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'dueDate',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'tos',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'payed',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    text: Ilc.resources.Manager.getResourceString('common.actions'),
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/remove.png',
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {

                                record.destroy({
                                    success: me.onDeleteSuccess,
                                    failure: me.onDeleteFailure
                                });

                            }
                        }
                    ]
                }
            ]
        });
    },
    
    initComponent: function () {
        var offersGrid = this.getOffersGrid();
        
        this.items = [
            offersGrid
        ];
        this.callParent(arguments);
    }
});