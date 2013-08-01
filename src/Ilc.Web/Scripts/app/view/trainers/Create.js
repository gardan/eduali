Ext.define('Ilc.view.trainers.Create', {
    extend: 'Ext.window.Window',
    
    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Phone nr.'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Address'
            },
            {
                xtype: 'button',
                text: 'Create',
                handler: function (button, e) {
                    var model = {};

                    me.fireEvent('addTrainer', me, model);
                }
            }
        ];

        me.addEvents(
            'addTrainer'
        );

        me.callParent(arguments);
    }
});