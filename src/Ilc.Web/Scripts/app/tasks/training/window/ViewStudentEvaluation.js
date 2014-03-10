Ext.define('Ilc.tasks.training.window.ViewStudentEvaluation', {
    extend: 'Ext.window.Window',
    xtype: 'viewstudentevaluationwindow',

    requires: [
        'Ilc.utils.Forms'
    ],

    layout: 'anchor',
    title: 'Edit student evaluation',

    progressEvaluation: null,

    trainingEntity: null,
    lessonEntity: null,
    student: null,

    evaluationUpdated: function() {
        this.close();
    },

    initParameters: function() {
        return {
            studentId: this.student == null ? 0 : this.student.get('id'),
            lessonId: this.lessonEntity == null ? 0 : this.lessonEntity.get('Id')
        };
    },

    initComponent: function () {
        var me = this;

        var progressEvaluationsStore = Ext.create('Ilc.store.ProgressEvaluations', {
            trainingId: me.trainingEntity.get('id')
        });

        progressEvaluationsStore.load({
            params: me.initParameters(),
            callback: function(records) {
                var progressInput = me.query('textarea')[0];
                me.progressEvaluation  = records[0];
                progressInput.setRawValue(me.progressEvaluation.get('progress'));
            }
        });

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
                    var inputs = me.query('textarea');
                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = me.progressEvaluation.get('id');

                    me.fireEvent('updateevaluation', me, model);
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
            'updateevaluation'
        );

        me.callParent(arguments);
    }
});