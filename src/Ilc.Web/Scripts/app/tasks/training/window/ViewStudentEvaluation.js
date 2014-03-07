Ext.define('Ilc.tasks.training.window.ViewStudentEvaluation', {
    extend: 'Ext.window.Window',

    requires: [
        'Ilc.utils.Forms'
    ],

    layout: 'anchor',
    title: 'Edit student evaluation',

    initComponent: function () {
        var me = this;

        var progressEvaluationsStore = Ext.create('Ilc.store.ProgressEvaluations', {
            trainingId: me.trainingEntity.get('id')
        });

        progressEvaluationsStore.load({
            callback: function(records) {
                var progressInput = me.query('textarea')[0];
                var evaluation = records[0];
                progressInput.setRawValue(evaluation.get('progress'));
            }
        });

        var trainingEntity = me.trainingEntity;
        var lessonEntity = me.lessonEntity;
        var studentEntity = me.student;

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