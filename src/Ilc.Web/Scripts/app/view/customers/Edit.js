Ext.define('Ilc.view.customers.Edit', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.customer'),

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
                fieldLabel: Ilc.resources.Manager.getResourceString('common.bankAccount'),
                name: 'bankAccount',
                value: cfgModel.bankAccount
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.billingAddress'),
                name: 'billingAddress',
                value: cfgModel.billingAddress
            }
            
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.edit'),
                handler: function (button, e) {
                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);
                    model.id = cfgModel.id;
                    // raise the event
                    me.fireEvent('editCustomer', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function() {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'editCustomer'
        );

        me.callParent(arguments);
    }
});