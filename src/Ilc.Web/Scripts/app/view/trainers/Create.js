Ext.define('Ilc.view.trainers.Create', {
    extend: 'Ext.window.Window',
    requires: [
        'Ilc.utils.Forms'
    ],
    modal: true,
    layout: 'anchor',
    bodyPadding: 10,
    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Phone nr.',
                name: 'phone',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Address',
                name: 'address',
                anchor: '100%'
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