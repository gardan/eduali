Ext.define('Ilc.tasks.training.Ended', {
    extend: 'Ext.window.Window',
    
    title: Ilc.resources.Manager.getResourceString('tasks.title.ended'),

    constructor: function () {
        var me = this;


        me.callParent(arguments);
    }
});