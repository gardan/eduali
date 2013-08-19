Ext.define('Ilc.tasks.training.Exam', {
    extend: 'Ext.window.Window',
    title: Ilc.resources.Manager.getResourceString('common.exam'),

    constructor: function () {
        var me = this;

        // 

        me.callParent(arguments);
    },
    
    html: "I can't tell what fields should exist here."
});