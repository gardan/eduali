Ext.define('Ilc.view.settings.Categories', {
    extend: 'Ext.tree.Panel',
    xtype: 'settingscategories',

    title: 'Settings',
    width: 250,
    autoScroll: true,
    rootVisible: false,

    initComponent: function() {
        var me = this;

        var store = Ext.create('Ext.data.TreeStore', {
            fields: ['component', 'text'],
            root: {
                expanded: true,
                children: [
                    {
                        text: 'General',
                        expanded: true,
                        children: [
                            {
                                text: 'Roles',
                                leaf: true,
                                component: 'Ilc.view.roles.List'
                            },
                            {
                                text: 'Subjects',
                                leaf: true,
                                component: 'Ilc.view.subjects.List'
                            },
                            {
                                text: 'Users',
                                leaf: true,
                                component: 'Ilc.view.users.List'
                            }
                        ]
                    }
                ]
            }
        });

        me.on('beforeselect', function (tree, record) {
            if (record.get('leaf') != true) return false;
        });

        me.on('select', function (tree, record) {
            if (record.get('leaf') == true) {
                me.fireEvent('leafselected', tree, record);
            }
        });

        me.store = store;

        me.addEvents(
            'leafselected'
        );

        me.callParent(arguments);
    }
});