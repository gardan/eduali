Ext.define('Ilc.tasks.training.Rfp', {
    extend: 'Ext.window.Window',
    xtype: 'rfpwindow',

    constructor: function () {
        var me = this;
        me.items = [];

        me.items.push({
            xtype: 'button',
            text: 'Click meee!',
            handler: function () {
                console.log('Firing addrfp');
                me.fireEvent('addrfp', me);
            }
        });

        me.addEvents(
            'addrfp'
        );
        
        me.callParent(arguments);
    },

    html: '<h3>This is RFP window!!</h3>'
});