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
                iconCls: 'icon-task-32',
                itemId: 'menu.tasks',
                hidden: !Ilc.Configuration.loggedIn(),
                tooltip:  {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.tasks'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                } // ,
            },
//            {
//                iconCls: 'icon-open-book-32',
//                itemId: 'menu.trainings?open=true',
//                // hidden: !Ilc.Configuration.claimExists('tasks-student'),
//                tooltip: {
//                    text: 'Open trainings',
//                    width: 100,
//                    showDelay: 0,
//                    hideDelay: 50
//                }
//            },
            {
                iconCls: 'icon-book-32',
                itemId: 'menu.trainings',
                hidden: !Ilc.Configuration.claimExists('training-read-all'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.trainings'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },
            {
                iconCls: 'icon-offer-32',
                itemId: 'menu.offers',
                hidden: false,
                tooltip: {
                    text: 'Offers',
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },

            {
                iconCls: 'icon-customer-32',
                itemId: 'menu.customers',
                hidden: !Ilc.Configuration.claimExists('customer-read-all'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.customers'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },
            {
                iconCls: 'icon-student-32',
                itemId: 'menu.students',
                hidden: !Ilc.Configuration.claimExists('student-read-all'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.students'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },
          
            {
                iconCls: 'icon-trainer-32',
                itemId: 'menu.trainers',
                hidden: !Ilc.Configuration.claimExists('trainer-read-all'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.trainers'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },
            {
                iconCls: 'icon-availability-32',
                itemId: 'menu.availability',
                border: false,
                hidden: !Ilc.Configuration.claimExists('tasks-trainer') && !Ilc.Configuration.claimExists('availability-read'),
                tooltip: {
                    text: 'Availability',
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                },
                listeners: {
                    click: function(panel) {
                        var viewport = panel.up('viewport');
                        viewport.fireEvent('menuclick', {
                            itemId: 'menu.availability'
                        });
                    }
                }
            },
            {
                iconCls: 'icon-planning-32',
                itemId: 'menu.planning',
                hidden: !Ilc.Configuration.claimExists('planning-read'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.planning'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },
            {
                iconCls: 'icon-statistics-32',
                itemId: 'menu.statistics',
                hidden: !Ilc.Configuration.claimExists('statistics-read'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.statistics'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },

            {
                iconCls: 'icon-settings-32',
                itemId: 'menu.settings',
                hidden: !Ilc.Configuration.claimExists('ui-settings-read'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.settings'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },
            {
                iconCls: 'icon-company-32',
                itemId: 'menu.companies',
                hidden: !Ilc.Configuration.claimExists('company-read-all'),
                tooltip: {
                    text: Ilc.resources.Manager.getResourceString('mainMenu.companies'),
                    width: 100,
                    showDelay: 0,
                    hideDelay: 50
                }
            },

            '->',
            {
                text: Ilc.resources.Manager.getResourceString('mainMenu.login'),
                hidden: Ilc.Configuration.loggedIn(),
                handler: function() {
                    Ilc.LoginManager.showLogin();
                }
            },
            {
                text: Ilc.Configuration.getValue('firstName') + ' ' + Ilc.Configuration.getValue('lastName'),
                hidden: !Ilc.Configuration.loggedIn(),
                cls: 'eduali-menu eduali-menu-right',
                toggleGroup: '',
                padding: false,
                border: false,
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
                padding: '10 10 2 10',
                border: false,
                defaults: {
                    iconAlign: 'right',
                    scale: 'large',
                    margin: 0,
                    overCls: 'eduali-menu-hover',
                    pressedCls: 'eduali-menu-pressed',
                    cls: 'eduali-menu',
                    toggleGroup: 'main-nav',
                    border: '0 2 0 0',
                    allowDepress: false
                },
                items: this._initMenuButtons()
            },
            {
                xtype: 'container',
                padding: '0 10 0 10',
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
//
//{
//    iconCls: 'icon-planning-32',
//    itemId: 'menu.offers',
//    border: false,
//    hidden: false,
//    tooltip: {
//        text: 'Offers',
//        width: 100,
//        showDelay: 0,
//        hideDelay: 50
//    }
//},