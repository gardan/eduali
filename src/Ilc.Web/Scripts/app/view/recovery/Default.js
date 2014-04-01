Ext.define('Ilc.view.recovery.Default', {
    extend: 'Ext.container.Container',
    xtype: 'recoverycontainer',

    config: {
        params: null,
    },
    
    updated: function() {
        Ext.History.fireEvent('change', '');
    },

    initComponent: function () {

        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.newPassword'),
                inputType: 'password',
                name: 'password'
            },
            {
                xtype: 'button',
                text: 'Save',
                listeners: {
                    click: function () {
                        var model = Ilc.utils.Forms.extractModel(this.query('textfield'));
                        model.token = this.params.token;
                        this.fireEvent('updatepassword', this, model);
                    },
                    scope: this
                }
            }
        ];

        this.callParent(arguments);
    }
});