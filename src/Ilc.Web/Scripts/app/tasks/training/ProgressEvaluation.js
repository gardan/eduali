Ext.define('Ilc.tasks.training.ProgressEvaluation', {
    extend: 'Ext.window.Window',
    xtype: 'progressEvaluationWindow',

    width: 800,
    layout: 'anchor',
    bodyPadding: 0,
    constructor: function () {
        var me = this;
        var lessonsStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{id: 1, name: 'Lesson 1'}, {id: 2, name: 'Lesson 2'}]
        });

        var studentsStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'evaluationId'],
            data: [{ id: 1, name: 'Gheorghe Alex', evaluationId: 1 }, { id: 2, name: 'Pascu Vlad', evaluationId: 0 }]
        });

        // grid with all the lessons
        var lessonsGrid = Ext.create('Ext.grid.Panel', {
            store: lessonsStore,
            columns: [
                { dataIndex: 'name', text: 'Name', flex: 1 }
            ],
            title: 'Lessons',
            margin: 2,
            columnWidth: 0.40
        });

        // grid with all the students, and their evaluations based on the selected lesson
        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            columns: [
                { dataIndex: 'name', text: 'Name', flex: 1 },
                {
                    xtype: 'actioncolumn',
                    getClass: function (v, meta, record) {
                        return record.get('evaluationId') == 0 ? 'add-col' : 'view-col';
                    },
                    getTip: function (v, meta, record) {
                        return record.get('evaluationId') == 0 ? 'Add Evaluation' : 'View Evaluation';
                    },
                    handler: function (grid, rowIndex, colIndex, item, e, record) {
                        var windowToCreate = record.get('evaluationId') == 0 ? 'CreateStudentEvaluation' : 'ViewStudentEvaluation';
                        var window = Ext.create('Ilc.tasks.training.window.' + windowToCreate, {
                            closeAction: 'destroy'
                        });
                        window.on('addEvaluation', function (sender, model) {
                            me.fireEvent('addEvaluation', sender, model, {
                                studentsStore: studentsStore
                            });
                        });
                        window.show();
                    }
                }
            ],
            title: 'Student evaluations',
            margin: 2,
            columnWidth: 0.60
        });

        me.items = [
            {
                xtype: 'panel',
                anchor: '100%',
                layout: 'column',
                items: [
                    lessonsGrid,
                    studentsGrid
                ]   
            },
            {
                xtype: 'button',
                text: 'Done',
                disabled: true,
                handler: function() {
                    var model = {};
                    me.fireEvent('allInterviewsAdded', me, model);
                }
            },
            {
                xtype: 'button',
                text: 'Close',
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addEvaluation',
            'allEvaluationsAdded'
        );

        me.callParent(arguments);
    }
});