Ext.define('Ilc.view.offers.List', {
    extend: 'Ext.container.Container',

    xtype: 'listoffers',

    getOffersStore: function () {
        Ext.define('Offer', {
            extend: 'Ext.data.Model',
            fields: [
                'customerName', 'active', 'createDate', 'creatorName', 'trainingIds', 'amount', 'sentToCustomer', 'accepted',
                'dueDate', 'tos', 'payed'
            ]
        });
        return Ext.create('Ext.data.Store', {
            model: 'Offer',
            data: [
                {
                    customerName: 'askdjaskds',
                    active: true,
                    createDate: '2014-12-12',
                    creatorName: 'asdasfj asdasdasd',
                    trainingIds: [1, 2, 3, 4],
                    amount: 12.35,
                    sentToCustomer: true,
                    accepted: false,
                    dueDate: '2015-01-15',
                    tos: 'asdasd asdaskd sasd',
                    payed: false
                }
            ]
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
            store: this.getOffersStore(),
            columns: [
                {
                    text: Ilc.resources.Manager.getResourceString('common.customer'),
                    dataIndex: 'customerName',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.lessonNo'),
                    dataIndex: 'active',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.lessonDuration'),
                    dataIndex: 'createDate',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.details'),
                    dataIndex: 'creatorName',
                    flex: 1
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