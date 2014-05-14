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
                    text: 'Roles',
                    component: 'Ilc.view.roles.List'
                },
                {
                    text: 'Subjects',
                    component: 'Ilc.view.subjects.List'
                },
                {
                    text: 'Users',
                    component: 'Ilc.view.users.List'
                },
                {
                    text: 'Status Definitions',
                    component: 'Ilc.view.statusDefinitions.List'
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.shiftTemplates'),
                    component: 'Ilc.view.templates.List'
                },
                {
                    text: 'Grading systems',
                    component: 'Ilc.view.gradingSystems.List'
                },
                {
                    text: 'Import trainer',
                    component: 'Ilc.view.import.Trainers'
                },
                {
                    text: 'Import customers',
                    component: 'Ilc.view.import.Customers'
                },
                {
                    text: 'Import students',
                    component: 'Ilc.view.import.Students'
                },
                {
                    text: 'Document templates',
                    component: 'Ilc.view.fileTemplates.Container'
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