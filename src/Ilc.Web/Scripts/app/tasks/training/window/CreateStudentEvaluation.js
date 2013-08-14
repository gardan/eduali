Ext.define('Ilc.tasks.training.window.CreateStudentEvaluation', {
    extend: 'Ext.window.Window',

    requires: [
        'Ilc.utils.Forms'
    ],

    layout: 'anchor',
    title: 'Add student evaluation',
    constructor: function () {
        var me = this;



        me.items = [
            {
                xtype: 'textarea',
                fieldLabel: 'Progress',
                anchor: '100%',
                resizable: true,
                name: 'progress'
            },
            {
                xtype: 'button',
                text: 'Add',
                handler: function () {
                    var model = {};
                    model = Ilc.utils.Forms.extractModel(me.query('textfield'));

                    me.fireEvent('addEvaluation', me, model);
                }
            }
        ];

        me.addEvents(
            'addEvaluation'
        );
        
        me.callParent(arguments);
    }
});