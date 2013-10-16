Ext.define('Ilc.view.users.Edit', {
    extend: 'Ext.window.Window',
    width: 800,
    bodyPadding: 0,

    layout: 'anchor',

    defaults: {
        anchor: '100%'
    },

    hideAction: 'destroy',

    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: 'General'
                },
                {
                    title: 'Roles'
                }
            ]
        }
    ],

    initComponent: function() {
        var me = this;



        me.callParent(arguments);
    }
});