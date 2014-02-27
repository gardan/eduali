Ext.define('Ilc.tasks.training.Base', {
    extend: 'Ext.window.Window',
    
    entity: null,

    layout: {
        type: 'anchor'
    },
    
    bodyPadding: 0,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});