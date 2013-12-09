Ext.define('Ilc.view.statistics.Types', {
    extend: 'Ext.panel.Panel',
    xtype: 'statisticstypes',

    title: 'Types',
    width: 250,
    autoScroll: true,

    tpl: '<tpl for="."><div class="feed-list-item">{text}</div></tpl>',

    initComponent: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            fields: ['component', 'text', 'index'],
            data: [
                {
                    index: 1,
                    text: Ilc.resources.Manager.getResourceString('statistics.priceSpendings'), // 'Price / Spendings',
                    component: 'Ilc.view.roles.List'
                },
                {
                    index: 2,
                    text: Ilc.resources.Manager.getResourceString('statistics.customerPurchases'), // 'Customer purchases',
                    component: 'Ilc.view.subjects.List'
                },
                {
                    index: 3,
                    text: Ilc.resources.Manager.getResourceString('statistics.trainingsMonth'), // 'Trainings / Month',
                    component: 'Ilc.view.users.List'
                }
            ]
        });

        me.items = [
            {
                xtype: 'dataview',
                trackOver: true,
                store: store,
                cls: 'settings-list',
                itemSelector: '.settings-item',
                overItemCls: 'settings-list-item-hover',
                tpl: '<tpl for="."><div class="settings-item">{text}</div></tpl>',
                listeners: {
                    beforeselect: function (view, record) {
                        me.fireEvent('leafselected', view, record);
                        return false;
                    }
                }
            }
        ];

        me.addEvents(
            'leafselected'
        );

        me.callParent(arguments);
    }
});