Ext.define('Ilc.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.toolbar.Toolbar',
        'Ext.panel.Panel'
    ],

    id: 'viewport',
    layout: 'border',
    autoScroll: true,
    items: [
        {
            xtype: 'toolbar',
            region: 'north',
            itemId: 'main-nav-toolbar',
            defaults: {
                scale: 'large',
                padding: '0 20',
                toggleGroup: 'main-nav',
                allowDepress: false
            },
            items: [
                {
                    text: 'Trainings',
                    itemId: 'trainings',
                    pressed: true
                },
                {
                    text: 'Customers',
                    itemId: 'customers',
                },
                {
                    text: 'Students',
                    itemId: 'students',
                },
                {
                    text: 'Statistics',
                    itemId: 'statistics',
                },
                {
                    text: 'Trainers',
                    itemId: 'trainers',
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'viewport-target',
            region: 'center',
            layout: 'fit'
        }
    ]
});