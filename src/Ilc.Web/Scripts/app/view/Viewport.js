Ext.define('Ilc.view.Viewport', {
    renderTo: Ext.getBody(),
    style: {
        'background-color': 'white'
    },
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.toolbar.Toolbar',
        'Ext.panel.Panel'
    ],

    id: 'viewport',
    layout: 'border',
    autoScroll: true,



    initMenuButtons: function () {
        // debugger;
        var toolbar = this.query('#main-nav-toolbar')[0];
        toolbar.removeAll();
        toolbar.add(this._initMenuButtons());
    },

    _initMenuButtons: function() {
        return [
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.tasks'),
                iconCls: 'icon-task-32',
                itemId: 'menu.tasks',
                
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.trainings'),
                iconCls: 'icon-book-32',
                itemId: 'menu.trainings?open=true',
                hidden: !Ilc.Configuration.claimExists('tasks-student')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.trainings'),
                iconCls: 'icon-book-32',
                itemId: 'menu.trainings',
                hidden: !Ilc.Configuration.claimExists('training-read-all')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.companies'),
                iconCls: 'icon-company-32',
                itemId: 'menu.companies',
                hidden: !Ilc.Configuration.claimExists('company-read-all')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.customers'),
                iconCls: 'icon-customer-32',
                itemId: 'menu.customers',
                hidden: !Ilc.Configuration.claimExists('customer-read-all')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.students'),
                iconCls: 'icon-student-32',
                itemId: 'menu.students',
                hidden: !Ilc.Configuration.claimExists('student-read-all')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.statistics'),
                iconCls: 'icon-statistics-32',
                itemId: 'menu.statistics',
                hidden: !Ilc.Configuration.claimExists('statistics-read')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.trainers'),
                iconCls: 'icon-trainer-32',
                itemId: 'menu.trainers',
                hidden: !Ilc.Configuration.claimExists('trainer-read-all')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.settings'),
                iconCls: 'icon-settings-32',
                itemId: 'menu.settings',
                hidden: !Ilc.Configuration.claimExists('ui-settings-read')
            },
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.planning'),
                iconCls: 'icon-planning-32',
                itemId: 'menu.planning',
                hidden: !Ilc.Configuration.claimExists('planning-read')
            },
            {
                text: 'Availability',
                iconCls: 'icon-availability-32',
                itemId: 'menu.availability',
                hidden: !Ilc.Configuration.claimExists('tasks-trainer') && !Ilc.Configuration.claimExists('availability-read'),
                listeners: {
                    click: function(panel) {
                        var viewport = panel.up('viewport');
                        viewport.fireEvent('menuclick', {
                            itemId: 'menu.availability'
                        });
                    }
                }
            },
            '->',
            {
                text: Ilc.Configuration.getValue('username'),
                toggleGroup: '',
                scale: 'medium',
                padding: '0',
                menu: [
                    {
                        text: Ilc.resources.Manager.getResourceString('common.profile'),
                        hidden: !Ilc.Configuration.loggedIn(),
                        handler: function(btn) {
                            var viewport = btn.up('viewport');
                            viewport.fireEvent('menuclick', {
                                itemId: 'menu.profile'
                            });
                        }
                    },
                    {
                        text: Ilc.resources.Manager.getResourceString('common.company'),
                        hidden: !Ilc.Configuration.claimExists('company-read'),
                        listeners: {
                            click: function(btn) {
                                var viewport = btn.up('viewport');
                                viewport.fireEvent('menuclick', {
                                    itemId: 'menu.company'
                                });
                            }
                        }
                    },
                    {
                        text: Ilc.resources.Manager.getResourceString('common.logout'),
                        handler: function () {
                            window.location.href = 'account/logout';
                        }
                    }
                ]
            }
        ];
    },

    _initItems: function() {
        return [
            {
                xtype: 'toolbar',
                region: 'north',
                itemId: 'main-nav-toolbar',
                defaults: {
                    scale: 'large',
                    // padding: '0 10',
                    toggleGroup: 'main-nav',
                    allowDepress: false
                },
                items: this._initMenuButtons()
            },
            {
                xtype: 'container',
                itemId: 'viewport-target',
                region: 'center',
                layout: 'fit'
            }
        ];
    },

    initComponent: function () {
        this.addEvents('menuclick');

        this.items = this._initItems();

        this.callParent(arguments);
    }
});