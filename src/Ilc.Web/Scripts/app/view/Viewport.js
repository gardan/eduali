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
                    text: Ilc.resources.Manager.getResourceString('mainMenu.tasks'),
                    itemId: 'tasks'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.trainings'),
                    itemId: 'trainings',
                    pressed: true
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.customers'),
                    itemId: 'customers',
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.students'),
                    itemId: 'students',
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.statistics'),
                    itemId: 'statistics',
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.trainers'),
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