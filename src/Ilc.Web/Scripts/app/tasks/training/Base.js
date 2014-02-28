Ext.define('Ilc.tasks.training.Base', {
    extend: 'Ext.window.Window',
    
    entity: null,

    layout: {
        type: 'anchor'
    },
    minWidth: 500,
    bodyPadding: 0,

    initComponent: function() {
        var me = this;

        me.addEvents(
            'afterexecute'
        );

        me.callParent(arguments);
    }
});