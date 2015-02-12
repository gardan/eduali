Ext.define('Ilc.view.profile.Edit', {
    extend: 'Ext.container.Container',
    xtype: 'profile',

    _fireUpdateEvent: function(btn, event) {
        var me = btn.up('profile');

        var model = Ilc.utils.Forms.extractModel(btn.up('fieldset').query('textfield'));
        me.fireEvent(event, me, model);
    },

    onGeneralClick: function () {
        this.up('profile')._fireUpdateEvent(this, 'updategeneral');
    },
    
    onEmailClick: function () {
        this.up('profile')._fireUpdateEvent(this, 'updateemail');
    },
    
    onPasswordClick: function () {
        this.up('profile')._fireUpdateEvent(this, 'updatepassword');
    },

    getDefaultItems: function () {
        return [
            {
                xtype: 'fieldset',
                padding: 10,
                width: 500,
                title: 'General',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                        name: 'firstName',
                        value: Ilc.Configuration.get().firstName,
                        padding: 10,
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                        name: 'lastName',
                        value: Ilc.Configuration.get().lastName,
                        padding: 10,
                    },
                    {
                        xtype: 'button',
                        text: Ilc.resources.Manager.getResourceString('common.save'),
                        handler: this.onGeneralClick,
                        width: 100
                    }
                ]
            },

            {
                xtype: 'fieldset',
                padding: 10,
                width: 500,
                title: 'Contact',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                        name: 'email',
                        value: Ilc.Configuration.get().username,
                        padding: 10
                    },
                    {
                        xtype: 'button',
                        text: Ilc.resources.Manager.getResourceString('common.save'),
                        handler: this.onEmailClick,
                        width: 100
                    }
                ]
            },

            {
                xtype: 'fieldset',
                title: 'Security',
                padding: 10,
                width: 500,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.currentPassword'),
                        name: 'currentPassword',
                        inputType: 'password',
                        padding: 10,
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.newPassword'),
                        name: 'newPassword',
                        inputType: 'password',
                        padding: 10,
                    },
                    {
                        xtype: 'button',
                        text: Ilc.resources.Manager.getResourceString('common.save'),
                        handler: this.onPasswordClick,
                        width: 100,
                    }
                ]
            }
        ];
    },

    updated: function() {
    },

    updateFailed: function (error) {
        var textfields = this.query('textfield');
        Ilc.utils.Forms.markInvalid(textfields, error);
    },

    initComponent: function () {
        this.addEvents(
            'updategeneral',
            'updateemail',
            'updatepassword'
        );

        this.items = this.getDefaultItems();

        this.callParent();
    }
});