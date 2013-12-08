Ext.define('Ilc.view.trainings.view.Planning', {
    extend: 'Ext.panel.Panel',
    xtype: 'planningTab',
    
    title: Ilc.resources.Manager.getResourceString('common.planning'),
    entity: null,
    
    scheduler: null,

    updateFinished: function() {
        this.fireEvent('updatecomplete');
    },

    initComponent: function (args) {
        var me = this;

        var entity = me.entity;
        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            // trainingId: trainingEntity.get('id')

            data: [
                {
                    Id: entity.get('trainer').id,
                    Name: entity.get('trainer').name
                }
            ],
        });

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: entity.get('id')
        });

        var trainingScheduler = Ext.create('Ilc.scheduler.Training', {
            // width: 890,
            height: 400,
            // startDate: new Date(2013, 10, 24, 6),
            eventResizeHandles: 'none',
            enableDragCreation: false,

            resourceStore: resourceStore,
            eventStore: eventStore,

        });

        trainingScheduler.on('eventdrop', function (scheduler, records) {
            debugger;
            // records is an array of record, for now we can only select one event, so just get the first item in the array
            var event = records[0];

            var model = {
                startDate: event.get('StartDate'),
                endDate: event.get('EndDate'),
                id: event.get('Id'),
                trainingId: entity.get('id')
            };

            me.fireEvent('updatelesson', me, model);
        });

        me.scheduler = trainingScheduler;
        me.items = [
            trainingScheduler
        ];
        
        // resourceStore.load();
        eventStore.load();

        me.addEvents(
            'updatelesson'
        );

        me.callParent(arguments);
    }
});