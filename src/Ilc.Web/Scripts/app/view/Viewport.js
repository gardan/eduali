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
                    itemId: 'menu.tasks'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.trainings'),
                    itemId: 'menu.trainings',
                    pressed: true
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.customers'),
                    itemId: 'menu.customers',
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.students'),
                    itemId: 'menu.students',
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.statistics'),
                    itemId: 'menu.statistics',
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.trainers'),
                    itemId: 'menu.trainers',
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.settings'),
                    itemId: 'menu.settings',
                    hidden: !Ilc.Configuration.claimExists('ui-settings-read')
                },
                {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.planning'),
                    itemId: 'menu.planning'
                },
                {
                    text: 'Availability',
                    itemId: 'menu.availability',
                    hidden: !Ilc.Configuration.claimExists('tasks-trainer') && !Ilc.Configuration.claimExists('availability-read'),
                    listeners: {
                        click: function (panel) {
                            var viewport = panel.up('viewport');
                            viewport.fireEvent('menuclick', {
                                itemId: 'menu.availability'
                            });
                        }
                    }
                },
                '->',
                {
                    text: Ilc.Configuration.get().username,
                    toggleGroup: '',
                    scale: 'medium',
                    padding: '0',
                    menu: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.logout'),
                            handler: function () {
                                window.location.href = 'account/logout';
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'viewport-target',
            region: 'center',
            layout: 'fit'
        }
    ],
    
    initComponent: function () {
        this.addEvents('menuclick');

        this.callParent(arguments);
    }
});