Ext.define('Ilc.view.subjects.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'editsubjectwindow',

    width: 800,
    bodyPadding: 0,

    role: null,

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield'
    },

    initComponent: function () {
        var me = this;

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name')
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function() {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);

                    me.fireEvent('editsubject', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function() {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'editsubject'
        );

        me.callParent(arguments);
    }
});