Ext.define('Ilc.view.users.Edit', {
    extend: 'Ext.window.Window',
    width: 800,
    bodyPadding: 0,

    layout: 'anchor',

    defaults: {
        anchor: '100%'
    },

    hideAction: 'destroy',

    user: null,

    initComponent: function() {
        var me = this;

        var rolesStore = Ext.create('Ilc.store.Roles');

        var rolesGrid = Ext.create('Ilc.grid.Roles', {
            store: rolesStore
        });

        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'General'
                    },
                    {
                        title: 'Roles',
                        items: [
                            rolesGrid
                        ]
                    }
                ]
            }
        ],
        
        rolesStore.load({
            params: {
                userId: me.user.get('id')
            }
        });

        me.callParent(arguments);
    }
});