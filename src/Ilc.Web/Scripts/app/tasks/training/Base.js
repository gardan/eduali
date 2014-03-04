Ext.define('Ilc.tasks.training.Base', {
    extend: 'Ext.window.Window',
    
    entity: null,

    layout: {
        type: 'anchor'
    },
    
    defaults: {
        anchor: '100%'
    },

    minWidth: 500,
    bodyPadding: 0,

    initComponent: function() {
        var me = this;

        me.addEvents(
            'execute',
            'afterexecute'
        );

        me.callParent(arguments);
    }
});