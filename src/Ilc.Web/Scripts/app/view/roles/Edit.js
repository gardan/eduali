Ext.define('Ilc.view.roles.Edit', {
    extend: 'Ext.window.Window',
    width: 800,
    bodyPadding: 0,


    initComponent: function () {
        var me = this;
        
        var claimsStore = Ext.create('Ilc.store.Claims');

        var claimsGrid = Ext.create('Ilc.grid.Claims', {
            store: claimsStore
        });

        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'General'
                    },
                    {
                        title: 'Claims',
                        items: [
                            claimsGrid
                        ]
                    }
                ]
            }
        ],
        claimsStore.load();

        me.callParent(arguments);
    }
});