Ext.define('Ilc.tasks.training.Rfi', {
    extend: 'Ext.window.Window',
    xtype: 'rfiwindow',

    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Possible costs'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'StartDate'
            },
            {
                xtype: 'button',
                text: 'Click meee!',
                handler: function () {
                    console.log('Firing addrfi');
                    me.fireEvent('addrfi', me);
                }
            }
        ];

        me.addEvents('addrfi');
        
        this.callParent(arguments);
    }
});