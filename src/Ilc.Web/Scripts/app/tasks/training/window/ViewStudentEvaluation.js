Ext.define('Ilc.tasks.training.window.ViewStudentEvaluation', {
    extend: 'Ext.window.Window',
    xtype: 'viewstudentevaluationwindow',

    requires: [
        'Ilc.utils.Forms'
    ],

    layout: 'anchor',
    title: 'Edit student evaluation',

    progressEvaluation: null,

    evaluationUpdated: function() {
        this.close();
    },

    initComponent: function () {
        var me = this;

        var progressEvaluationsStore = Ext.create('Ilc.store.ProgressEvaluations', {
            trainingId: me.trainingEntity.get('id')
        });

        progressEvaluationsStore.load({
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