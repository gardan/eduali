Ext.define('Ilc.view.trainers.Edit', {
    extend: 'Ext.window.Window',
    
    title: Ilc.resources.Manager.getResourceString('common.trainer'),

    requires: [
        'Ilc.utils.Forms'
    ],
    constructor: function (config) {
        var me = this;

        var cfgModel = config.model;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                value: cfgModel.name
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phoneNr'),
                name: 'phone',
                value: cfgModel.phone
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.address'),
                name: 'address',
                value: cfgModel.address
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.edit'),
                handler: function (button, e) {
                    var model = {};
                    var inputs = me.query('textfield');
                    model = Ilc.utils.Forms.extractModel(inputs);

                    model.id = cfgModel.id;

                    me.fireEvent('editTrainer', me, model);
                }
            }
        ];

        me.addEvents(
            'editTrainer'
        );

        me.callParent(arguments);
    }
});