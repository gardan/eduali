Ext.define('Ilc.window.Login', {
    extend: 'Ext.window.Window',

    width: 400,

    config: {
        handler: null
    },

    title: 'Login',

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

    onForgotPassword: function() {
        var window = Ext.create('Ilc.window.Recover');

        window.show();
    },

    onSignUp: function() {
        var window = Ext.create('Ilc.window.CreateAccount', {
            listeners: {
                created: this.onAccountCreateSuccess,
                scope: this
            }
        });

        window.show();
    },

    onAccountCreateSuccess: function() {
        this.fireEvent('afterloginsuccess');
    },

    initComponent: function () {

        this.addEvents(
            'loginclick',
            'afterloginsuccess'
        );

        this.buttons = [
            {
                cls: 'link-button',
                text: 'Forgot password?',
                listeners: {
                    click: this.onForgotPassword,
                    scope: this
                }
            },
            '->',
            {
                text: 'Sign up',
                listeners: {
                    click: this.onSignUp,
                    scope: this
                }
            },
            {
                text: 'Login',
                handler: this.handler
            }
        ];


        this.callParent(arguments);
    },
});