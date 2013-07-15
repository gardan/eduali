Ext.define('Ilc.tasks.training.Rfp', {
    extend: 'Ext.window.Window',
    xtype: 'rfpwindow',
    items: [],

    constructor: function () {
        var me = this;

        me.callParent(arguments);
    },

    html: '<h3>This is RFP window!!</h3>'
});