Ext.define('Ilc.view.customers.Edit', {
    extend: 'Ext.window.Window',

    title: 'Edit customer',

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
                fieldLabel: 'Bank account',
                name: 'bankAccount',
                value: cfgModel.bankAccount
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Billing address',
                name: 'billingAddress',
                value: cfgModel.billingAddress
            },
            {
                xtype: 'button',
                text: 'Edit',
                handler: function (button, e) {
                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);
                    model.id = cfgModel.id;
                    // raise the event
                    me.fireEvent('editCustomer', me, model);
                }
            }
        ];


        me.addEvents(
            'editCustomer'
        );

        me.callParent(arguments);
    }
});