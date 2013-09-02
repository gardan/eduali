Ext.define('Ilc.tasks.training.Interview', {
    extend: 'Ext.window.Window',
    xtype: 'interviewwindow',
    width: 600,

    title: Ilc.resources.Manager.getResourceString('common.studentsInterviews'),

    constructor: function(args) {
        var me = this;

        var entity = args.entity;

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
                me.fireEvent('allInterviewsAdded', me, {});
            }
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

        studentsGrid.on('addInterview', function (sender, data) {
            me.fireEvent('addInterview', sender, data, {
                store: studentsStore
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
        studentsStore.load();

        me.addEvents(
            'addInterview',
            'allInterviewsAdded'
        );

        me.callParent(arguments);
    }
});