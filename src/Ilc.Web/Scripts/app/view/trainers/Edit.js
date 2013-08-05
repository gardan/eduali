Ext.define('Ilc.view.trainers.Edit', {
    extend: 'Ext.window.Window',
    requires: [
        'Ilc.utils.Forms'
    ],
    constructor: function (config) {
        var me = this;

        var cfgModel = config.model;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name',
                value: cfgModel.name
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Phone nr.',
                name: 'phone',
                value: cfgModel.phone
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Address',
                name: 'address',
                value: cfgModel.address
            },
            {
                xtype: 'button',
                text: 'Edit',
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