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

    getOffersGrid: function() {
        return Ext.create('Ext.grid.Panel', {
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