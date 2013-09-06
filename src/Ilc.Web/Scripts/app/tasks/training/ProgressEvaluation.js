Ext.define('Ilc.tasks.training.ProgressEvaluation', {
    extend: 'Ext.window.Window',
    xtype: 'progressEvaluationWindow',

    title: Ilc.resources.Manager.getResourceString('common.progressEvaluations'),

    width: 800,
    layout: 'anchor',
    bodyPadding: 0,
    constructor: function (args) {
        var me = this;

        var entity = args.entity;

        var lessonsStore = Ext.create('Ilc.store.Lessons', {
            trainingId: entity.get('id')
        });
        

        var studentsStore = Ext.create('Ilc.tasks.training.store.ProgressEvalStudents', {
            trainingId: entity.get('id')
        });     
        
        // grid with all the lessons
        var lessonsGrid = Ext.create('Ext.grid.Panel', {
            store: lessonsStore,
            columns: [
                { dataIndex: 'Name', text: Ilc.resources.Manager.getResourceString('common.name'), flex: 1 }
            ],
            title: Ilc.resources.Manager.getResourceString('common.lessons'),
            margin: 2,
            columnWidth: 0.40
        });

        // grid with all the students, and their evaluations based on the selected lesson
        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            columns: [
                { dataIndex: 'name', text: Ilc.resources.Manager.getResourceString('common.name'), flex: 1 },
                {
                    xtype: 'actioncolumn',
                    getClass: function (v, meta, record) {
                        return record.get('progressEvaluationId') == 0 ? 'add-col' : 'view-col';
                    },
                    getTip: function (v, meta, record) {
                        return record.get('progressEvaluationId') == 0 ? Ilc.resources.Manager.getResourceString('common.add') : Ilc.resources.Manager.getResourceString('common.view');
                    },
                    handler: function (grid, rowIndex, colIndex, item, e, record) {
                        var windowToCreate = record.get('progressEvaluationId') == 0 ? 'CreateStudentEvaluation' : 'ViewStudentEvaluation';
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
            title: Ilc.resources.Manager.getResourceString('common.evaluations'),
            margin: 2,
            columnWidth: 0.60
        });

        lessonsStore.on('load', function (store, records, successfull, eOpts) {
            // select the first item
            lessonsGrid.getSelectionModel().select(0);
            debugger;
            // load the students
            studentsStore.load({
                params: {
                    lessonId: records[0].get('Id')
                }
            });
        });

        lessonsGrid.on('select', function (row, record) {
            studentsStore.load({
                params: {
                    lessonId: record.get('Id')
                }
            });
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
                text: Ilc.resources.Manager.getResourceString('common.done'),
                disabled: true,
                handler: function() {
                    var model = {};
                    me.fireEvent('allInterviewsAdded', me, model);
                }
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.close'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addEvaluation',
            'allEvaluationsAdded'
        );

        lessonsStore.load();

        me.callParent(arguments);
    }
});