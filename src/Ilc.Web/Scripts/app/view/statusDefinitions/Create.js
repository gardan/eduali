Ext.define('Ilc.view.statusDefinitions.Create', {
    extend: 'Ext.window.Window',
    xtype: 'createstatusdefinitionwindow',

    layout: 'anchor',

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    initComponent: function () {
        var me = this;

        me.title = Ilc.resources.Manager.getResourceString('common.newStatus')

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                // value: me.statusDefinition.get('name')
            },
            {
                xtype: 'numericfield',
                fieldLabel: 'Weight',
                name: 'weight',
                // value: me.statusDefinition.get('weight')
            },
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function () {
                    var inputs = me.query('textfield');

                    var data = Ilc.utils.Forms.extractModel(inputs);
                    var createModel = Ext.create('Ilc.model.create.Status', data);
                    createModel.save({
                        success: function() {
                            me.fireEvent('created-status');
                            me.close();
                        },
                        faliure: function() {
                            // TODO: handle error case
                        }
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
            'created-status'
        );

        me.callParent(arguments);
    }
})