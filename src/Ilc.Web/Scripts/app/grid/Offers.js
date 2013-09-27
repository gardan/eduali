Ext.define('Ilc.grid.Offers', {
    extend: 'Ext.grid.Panel',

    viewConfig: {
        deferEmptyText: false,
        emptyText: 'There are no offers, please use the button below to create an offer.'
    },

    constructor: function () {
        var me = this;

        me.columns = [
            {
                text: Ilc.resources.Manager.getResourceString('common.possibleCosts'),
                dataIndex: 'possibleCost',
                flex: 1
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        text: Ilc.resources.Manager.getResourceString('common.createOffer'),
                        handler: function () {
                            me.fireEvent('newofferclick');
                        }
                    }
                ]
            }
        ];

        me.addEvents(
            'newofferclick'
        );

        me.callParent(arguments);
    }
});