Ext.define('Ilc.tasks.training.Interview', {
    extend: 'Ext.window.Window',
    xtype: 'interviewwindow',
    width: 350,
    layout: 'anchor',
    
    defaults: {
        anchor: '100%'
    },

    title: Ilc.resources.Manager.getResourceString('common.studentsInterviews'),

    constructor: function(args) {
        var me = this;

        var entity = args.entity;
        var tasksStore = args.tasksStore;

        var studentsStore = Ext.create('Ilc.tasks.training.store.Students', {
            trainingId: entity.get('id')
        });

        var studentsGrid = Ext.create('Ilc.tasks.training.grid.Students', {
            store: studentsStore,
            entity: entity
        });

        var doneButton = Ext.create('Ext.button.Button', {
            text: Ilc.resources.Manager.getResourceString('common.done'),
            disabled: true,
            handler: function () {
                me.fireEvent('allInterviewsAdded', me, {
                    taskEntityId: entity.get('id')
                }, {
                    tasksStore: tasksStore
                });
            }
        });

        me.items = [
            studentsGrid
        ];

        studentsGrid.on('addInterview', function (sender, data) {
            me.fireEvent('addInterview', sender, data, {
                studentsStore: studentsStore,
                tasksStore: tasksStore
            });
        });

        // enable | disable "Done" button
        studentsStore.on('load', function (store, records) {
            
            var isDisabled = false;
            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                if (record.get('interviewId') == 0) {
                    isDisabled = true;
                }
            }
            doneButton.setDisabled(isDisabled);
        });

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
            'addInterview',
            'allInterviewsAdded'
        );

        studentsStore.load();

        me.callParent(arguments);
    }
});