﻿Ext.define('Ilc.view.Viewport', {
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
                '->',
                {
                    text: '[username]',
                    toggleGroup: '',
                    scale: 'medium',
                    padding: '0',
                    menu: [
                        {
                            text: 'Item 1',
                        },
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
    ]
});