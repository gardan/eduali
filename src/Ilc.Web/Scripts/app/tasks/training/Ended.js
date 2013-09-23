Ext.define('Ilc.tasks.training.Ended', {
    extend: 'Ext.window.Window',
    
    xtype: 'endedwindow',

    title: Ilc.resources.Manager.getResourceString('tasks.title.ended'),
    width: 800,
    constructor: function (args) {
        var me = this;

        var trainingEntity = args.entity;
        var tasksStore = args.tasksStore;

        var studentsStore = Ext.create('Ilc.tasks.training.store.Students', {
            trainingId: trainingEntity.get('id')
        });

        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            columns: [
                { dataIndex: 'name', text: Ilc.resources.Manager.getResourceString('common.name'), flex: 1 },
                {
                    xtype: 'actioncolumn',
                    getClass: function (v, meta, record) {
                        return record.get('assesmentId') == 0 ? 'add-col' : 'view-col';
                    },
                    getTip: function (v, meta, record) {
                        return record.get('assesmentId') == 0 ? Ilc.resources.Manager.getResourceString('common.add') : Ilc.resources.Manager.getResourceString('common.view');
                    },
                    handler: function (grid, rowIndex, colIndex, item, e, record) {

                        var windowToCreate = record.get('assesmentId') == 0 ? 'CreateStudentAssesment' : 'ViewStudentAssesment';
                        var window = Ext.create('Ilc.tasks.training.window.' + windowToCreate, {
                            closeAction: 'destroy',
                            student: record,
                            task: trainingEntity
                        });
                        window.on('addAssesment', function (sender, model) {
                            console.log(model);
                            me.fireEvent('addAssesment', sender, model, {
                                studentsStore: studentsStore
                            });
                        });
                        window.show();
                    }
                }
            ]
        });

        var doneButton = Ext.create('Ext.button.Button', {
            text: Ilc.resources.Manager.getResourceString('common.done'),
            handler: function () {
                var model = {
                    taskEntityId: trainingEntity.get('id')
                };

                me.fireEvent('addAssesment', me, model, {
                    tasksStore: tasksStore
                });
            }
        });

        studentsStore.on('load', function (store, records) {
            
            var isDisabled = false;
            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                if (record.get('assesmentId') == 0) {
                    isDisabled = true;
                }
            }
            doneButton.setDisabled(isDisabled);
        });

        me.items = [
            studentsGrid,
            doneButton,
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.close'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addAssesment'
        );

        studentsStore.load();

        me.callParent(arguments);
    }
});