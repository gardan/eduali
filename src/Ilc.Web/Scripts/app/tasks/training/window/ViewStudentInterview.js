Ext.define('Ilc.tasks.training.window.ViewStudentInterview', {
    extend: 'Ext.window.Window',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.view'),
    layout: 'anchor',

    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'label',
                text: 'askjaskfja',
                anchor: '100%'
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.close'),
                handler: function (btn, events) {
                    me.close();
                },
                anchor: '100%'
            }
        ];

        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});