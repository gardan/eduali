Ext.define('Ilc.window.CreateAccount', {
    extend: 'Ext.window.Window',
    xtype: 'createaccountwindow',

    layout: 'anchor',
    
    defaults: {
        anchor: '100%'
    },
    
    items: [
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.company'),
        },
        {
            xtype: 'textfield',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
            name: 'userInfo.email'
        },
        {
            xtype: 'textfield',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.password'),
            name: 'userInfo.password'
        },
        {
            xtype: 'textfield',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
            name: 'userInfo.firstName'
        },
        {
            xtype: 'textfield',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
            name: 'userInfo.lastName'
        }
    ],
    
    companyAdded: function() {
        this.fireEvent('created');
        this.close();
    },

    onCreateClick: function() {
        var model = Ilc.utils.Forms.extractModel(this.query('textfield'));
        this.fireEvent('addnewaccount', this, model);
    },

    initComponent: function() {
        this.addEvents(
            'created',
            'addnewaccount'
        );

        this.buttons = [
            {
                text: 'Create',
                listeners: {
                    click: this.onCreateClick,
                    scope: this
                }
            }
        ];

        this.callParent();
    }
});