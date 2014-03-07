Ext.define('Ilc.tasks.training.window.ViewStudentEvaluation', {
    extend: 'Ext.window.Window',

    requires: [
        'Ilc.utils.Forms'
    ],

    layout: 'anchor',
    title: 'Edit student evaluation',
    constructor: function (args) {
        var me = this;

        var trainingEntity = args.trainingEntity;
        var lessonEntity = args.lessonEntity;
        var studentEntity = args.student;

        me.items = [
            {
                xtype: 'textarea',
                fieldLabel: 'Progress',
                anchor: '100%',
                //resizable: true,
                name: 'progress'
            }
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function () {
                    var model = {};
                    model = Ilc.utils.Forms.extractModel(me.query('textfield'));
                    model.taskEntityId = trainingEntity.get('id');
                    model.lessonId = lessonEntity.get('Id');
                    model.studentId = studentEntity.get('id');

                    me.fireEvent('addEvaluation', me, model);
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
            'addEvaluation'
        );

        me.callParent(arguments);
    }
});