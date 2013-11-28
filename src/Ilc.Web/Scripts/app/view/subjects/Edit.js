Ext.define('Ilc.view.subjects.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'editsubjectwindow',

    bodyPadding: 0,
    layout: 'anchor',

    subject: null,

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    editComplete: function() {
        this.fireEvent('editcomplete');
        this.close();
    },

    initComponent: function () {
        var me = this;

        me.items = [
            {
                padding: '5 5 0 5',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                value: me.subject.get('name')
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function() {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = me.subject.get('id');

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
            'editsubject',
            'editcomplete'
        );

        me.callParent(arguments);
    }
});