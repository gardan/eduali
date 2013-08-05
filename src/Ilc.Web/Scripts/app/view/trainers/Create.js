Ext.define('Ilc.view.trainers.Create', {
    extend: 'Ext.window.Window',
    requires: [
        'Ilc.utils.Forms'
    ],
    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Phone nr.',
                name: 'phone'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Address',
                name: 'address'
            },
            {
                xtype: 'button',
                text: 'Create',
                handler: function (button, e) {
                    var model = {};
                    var inputs = me.query('textfield');
                    model = Ilc.utils.Forms.extractModel(inputs);
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