Ext.define('Ilc.view.offers.List', {
    extend: 'Ext.container.Container',

    xtype: 'listoffers',

    getOffersStore: function () {
        
        return Ext.create('Ext.data.Store', {
            model: 'Ilc.model.Offer'
        });
    },

    onOfferDblClick: function (grid, model) {
        Ext.ux.Router.redirect('offers/' + model.get('id'));
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
                        return value.fullName;
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.trainings'),
                    dataIndex: 'trainings',
                    flex: 1,
                    renderer: function (value) {
                        return R.reduce(function (a, b) {
                            return a + b.compositeId;
                        }, '', value);
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.amount'),
                    dataIndex: 'amount',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.sentAt'),
                    dataIndex: 'sentAt',
                    flex: 1,
                    renderer: function(value) {
                        return value || 'Not sent';
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.accepted'),
                    dataIndex: 'accepted',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.paymentDueAt'),
                    dataIndex: 'paymentDueAt',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.tos'),
                    dataIndex: 'tos',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.payed'),
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
                        },
                        {
                            icon: 'images/web/active.png',
                            tooltip: Ilc.resources.Manager.getResourceString('common.active'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                var updateRecord = record.getEditModel();
                                updateRecord.set('active', true);
                                updateRecord.save({
                                    success: function () {
                                        grid.store.reload();
                                    },
                                    failure: function() {
                                        console.log('failed with: ');
                                        console.log(arguments);
                                    }
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