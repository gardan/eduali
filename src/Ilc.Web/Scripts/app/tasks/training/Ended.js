Ext.define('Ilc.tasks.training.Ended', {
    extend: 'Ext.window.Window',
    
    xtype: 'endedwindow',

    title: Ilc.resources.Manager.getResourceString('tasks.title.ended'),
    width: 350,
    constructor: function (args) {
        var me = this;

        var trainingEntity = args.entity;
        var tasksStore = args.tasksStore;

        var studentsStore = Ext.create('Ilc.tasks.training.store.Students', {
            trainingId: trainingEntity.get('id')
        });

        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            viewConfig: {
                getRowClass: function (record) {
                    var assesmentId = record.get('assesmentId');
                    return assesmentId == 0 ? 'grid-row-pending' : 'grid-row-complete';
                }
            },
            columns: [
                { dataIndex: 'name', text: Ilc.resources.Manager.getResourceString('common.name'), flex: 1 }
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

        studentsGrid.on('itemdblclick', function(grid, record) {
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
        });

        me.items = [
            studentsGrid
        ];

        me.buttons = [
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