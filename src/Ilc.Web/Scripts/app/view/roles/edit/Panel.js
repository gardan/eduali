Ext.define('Ilc.view.roles.edit.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'editrolepanel',
    
    layout: 'anchor',

    defaults: {
        padding: '5 5 0 5',
        anchor: '100%'
    },

    role: null,

    editComplete: function () {
        this.fireEvent('editcomplete');
    },

    initComponent: function() {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                value: me.role.get('name'),
                name: 'name'
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function() {
                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);
                    model.id = me.role.get('id');
                    
                    // raise the event
                    me.fireEvent('edit', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function() {
                    me.fireEvent('cancelclicked');
                }
            }
        ];

        me.addEvents(
            'cancelclicked',
            'edit',
            'editcomplete'
        );

        me.callParent(arguments);
    }
});