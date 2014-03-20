Ext.define('Ilc.window.Recover', {
    extend: 'Ext.window.Window',
    xtype: 'recoverwindow',

    title: 'Recover password',

    layout: {
        type: 'anchor'
    },

    defaults: {
        labelAlign: 'top',
        anchor: '100%'
    },

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email'
        }
    ],
    
    updated: function () {
        var me = this;
        Ext.MessageBox.show({
            msg: 'An email has been sent to that email. Please check your inbox.',
            buttons: Ext.Msg.OK,
            fn: function() {
                me.close();
            }
        });
    },

    initComponent: function () {
        this.addEvents(
            'recover'
        );

        this.buttons = [
            {
                text: 'Recover',
                listeners: {
                    click: this.onRecoverClick,
                    scope: this
                },
            }
        ];

        this.callParent(arguments);
    },

    onRecoverClick: function() {
        var model = Ilc.utils.Forms.extractModel(this.query('textfield'));
        this.fireEvent('recover', this, model);

    }
});