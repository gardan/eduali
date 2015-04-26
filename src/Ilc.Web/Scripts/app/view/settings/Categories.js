Ext.define('Ilc.view.settings.Categories', {
    extend: 'Ext.panel.Panel',
    xtype: 'settingscategories',

    title: 'Settings',
    width: 250,
    autoScroll: true,

    tpl: '<tpl for="."><div class="feed-list-item">{text}</div></tpl>',

    initComponent: function() {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            fields: ['component', 'text'],
            data: [
                {
                    text: Ilc.resources.Manager.getResourceString('common.roles'), // 'Roles',
                    component: 'Ilc.view.roles.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.subjects'),
                    component: 'Ilc.view.subjects.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.users'),
                    component: 'Ilc.view.users.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.statusDefinitions'),
                    component: 'Ilc.view.statusDefinitions.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.shiftTemplates'),
                    component: 'Ilc.view.templates.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.gradingSystems'),
                    component: 'Ilc.view.gradingSystems.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.importTrainers'),
                    component: 'Ilc.view.import.Trainers'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.importCustomers'),
                    component: 'Ilc.view.import.Customers'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.importStudents'),
                    component: 'Ilc.view.import.Students'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.documentTemplates'),
                    component: 'Ilc.view.fileTemplates.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.expenseTypes'),
                    component: 'Ilc.view.expenseTypes.List'
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
                    select: function (view, record) {
                        me.fireEvent('leafselected', view, record);
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