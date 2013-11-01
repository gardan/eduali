Ext.define('Ilc.view.subjects.Create', {
    extend: 'Ext.window.Window',
    xtype: 'createsubjectwindow',

    width: 400,
    layout: 'anchor',

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    requires: [
        'Ilc.utils.Forms'
    ],

    initComponent: function () {
        var me = this;


        me.items = [
            {
                fieldLabel: 'Name',
                name: 'name'
            }
        ];

        me.buttons = [
            {
                text: 'Create',
                handler: function () {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);

                    me.fireEvent('addsubject', me, model);
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
            'addsubject'
        );

        me.callParent();
    }
});