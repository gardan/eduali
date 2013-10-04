Ext.define('Ilc.view.trainers.Create', {
    extend: 'Ext.window.Window',
    
    title: Ilc.resources.Manager.getResourceString('common.newTrainer'),

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
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phoneNr'),
                name: 'phone',
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.address'),
                name: 'address',
                anchor: '100%'
            }
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.add'),
                handler: function (button, e) {
                    var model = {};
                    var inputs = me.query('textfield');
                    model = Ilc.utils.Forms.extractModel(inputs);
                    me.fireEvent('addTrainer', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addTrainer'
        );

        me.callParent(arguments);
    }
});