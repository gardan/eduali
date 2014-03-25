Ext.define('Ilc.tasks.training.window.CreateStudentInterview', {
    extend: 'Ext.window.Window',
    modal: true,

    requires: [
        'Ilc.model.GradingSystem',
        'Ilc.form.InterviewFieldset'
    ],

    title: Ilc.resources.Manager.getResourceString('common.newInterview'),
    layout: 'anchor',
    width: 300,

    gradingSystemId: null,
    gradesStore: null,
    gradingSystem: null,
   
    __initItems: function () {
        var me = this;
        var attributes = this.gradingSystem.get('attributes');

        Ext.Array.forEach(attributes, function(attr) {
            me.add(
                {
                    xtype: 'interviewfieldset',
                    gradesStore: me.gradesStore,
                    attribute: attr,
                    name: 'interviewResults'
                }
            );
        });

        me.add({
            xtype: 'fieldset',
            title: Ilc.resources.Manager.getResourceString('common.remarks'),
            items: [
                 {
                     xtype: 'textarea',
                     name: 'remarks',
                     anchor: '100%'
                 }
            ]
        });
    },

    constructor: function (args) {
        var me = this;

        var task = args.task;
        var student = args.student;
        var store = Ext.create('Ilc.tasks.training.store.Grades');
        this.gradesStore = store;
        
        var gradingSystemModel = Ext.ModelManager.getModel('Ilc.model.GradingSystem');
        gradingSystemModel.load(task.get('taskObject').gradingSystemId, {
            scope: me,
            success: function (gradingSystem) {
                me.gradesStore.loadRawData(gradingSystem.get('grades'));
                me.gradingSystem = gradingSystem;
                me.__initItems();
            }
        });
        
               
        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function (btn, events) {
                    var model = {};
                    // var example =
                    // {
                    //     interviewResults: [
                    //         {
                    //             gradingAttributeId: 1,
                    //             currentGradeId: 1,
                    //             targetGradeId: 2
                    //         }
                    //     ]
                    // };

                    model = Ilc.utils.Forms.extractModel(me.query('interviewfieldset'));

                    model.studentId = student.get('id');
                    model.taskEntityId = task.get('id');
                    console.log(model);
                    me.fireEvent('addInterview', me, model);
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
            'addInterview'
        );

        me.callParent(arguments);
    }
});