Ext.define('Ilc.view.trainers.Edit', {
    extend: 'Ext.window.Window',
    
    title: Ilc.resources.Manager.getResourceString('common.trainer'),

    requires: [
        'Ilc.utils.Forms'
    ],
    
    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },
    
    layout: 'anchor',

    constructor: function (config) {
        var me = this;

        var cfgModel = config.model;

        me.items = [
             {
                 fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                 name: 'userInfo.firstName',
                 value: cfgModel.userInfo.firstName
             },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                name: 'userInfo.lastName',
                value: cfgModel.userInfo.lastName
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                name: 'userInfo.email',
                value: cfgModel.userInfo.email
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                name: 'userInfo.phone',
                value: cfgModel.userInfo.phone
            }
        ];

        me.buttons = [
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
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'editTrainer'
        );

        me.callParent(arguments);
    }
});