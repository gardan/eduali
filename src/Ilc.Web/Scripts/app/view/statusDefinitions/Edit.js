Ext.define('Ilc.view.statusDefinitions.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'editstatusdefinitionwindow',

    store: null,
    statusDefinition: null,

    layout: 'anchor',

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    initComponent: function() {
        var me = this;

        me.title = me.statusDefinition.get('name');

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.friendlyName'),
                name: 'friendlyName',
                value: me.statusDefinition.get('friendlyName')
            }
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function () {
                    var model = {};
                    var inputs = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = me.statusDefinition.get('id');
                    
                    me.fireEvent('editstatusdefinition', me, model, {
                        store: me.store
                    });
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
            'editstatusdefinition'
        );

        me.callParent(arguments);
    }
})