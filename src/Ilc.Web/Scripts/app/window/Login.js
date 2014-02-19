Ext.define('Ilc.window.Login', {
    extend: 'Ext.window.Window',

    config: {
        handler: null
    },

    items: [
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email'
        },
        {
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password',
            inputType: 'password'
        }
    ],

    initComponent: function () {

        this.buttons = [
            {
                text: 'Login',
                handler: this.handler
            }
        ];


        this.callParent(arguments);
    },
});