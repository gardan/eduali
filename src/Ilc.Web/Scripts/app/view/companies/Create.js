Ext.define('Ilc.view.companies.Create', {
    extend: 'Ext.window.Window',
    xtype: 'createcompanywindow', 

    minWidth: 400,
    layout: 'anchor',
    defaults: {
        layout: 'anchor',
        anchor: '100%'    
    },
    
    requires: [
        'Ilc.utils.Forms'
    ],

    items: [
        {
            xtype: 'textfield',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
            name: 'name'
        },
        {
            xtype: 'fieldset',
            title: 'Main user',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                    name: 'userInfo.email'
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
            ]
        }
    ],

    buttons: [
        {
            text: Ilc.resources.Manager.getResourceString('common.add'),
            handler: function (btn) {
                var me = btn.up('window');
                var model = {};

                var textboxes = me.query('textfield');

                model = Ilc.utils.Forms.extractModel(textboxes);

                me.fireEvent('addcompany', me, model);
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.cancel'),
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ],
    
    companyAdded: function() {
        this.fireEvent('companyadded');
        this.close();
    },

    initComponent: function() {
        var me = this;

        me.addEvents(
            'addcompany',
            'companyadded'
        );

        me.callParent(arguments);
    }
});