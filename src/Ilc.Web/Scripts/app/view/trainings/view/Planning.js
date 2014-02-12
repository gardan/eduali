Ext.define('Ilc.view.trainings.view.Planning', {
    extend: 'Ext.panel.Panel',
    xtype: 'planningTab',
    
    title: Ilc.resources.Manager.getResourceString('common.planning'),
    entity: null,
    
    layout: {
        type: 'column'
    },

    scheduler: null,
    lessonsContainer: null,

    setEntity: function(entity) {
        this.entity = entity;
        
        this.scheduler.resourceStore.loadRawData(
            {
                Id: entity.get('trainer').id,
                Name: entity.get('trainer').name
            }
        );
        
        this.scheduler.eventStore.reload();
    },

    updateFinished: function() {
        this.fireEvent('updatecomplete');
    },

    initLessonsContainer: function() {
        return Ext.create('Ilc.view.lessons.List', {
            training: this.entity,
            columnWidth: 0.2,
            listeners: {
                'selected': this.onLessonsListSelected,
                scope: this
            }
        });
    },

    onLessonsListSelected: function (container, record) {
        this.scheduler.getSchedulingView().scrollEventIntoView(record);
    },

    initComponent: function (args) {
        var me = this;

        var entity = me.entity;
        var resourceStore = Ext.create('Sch.data.ResourceStore', {
        });

        resourceStore.loadRawData(
            {
                Id: entity.get('trainer').id,
                Name: entity.get('trainer').name
            }
        );

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
            
            columnWidth: 0.8,
            
            scrollToEvent: false
        });

        trainingScheduler.on('eventdrop', function (scheduler, records) {
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
        me.lessonsContainer = me.initLessonsContainer();
        me.items = [
            trainingScheduler,
            me.lessonsContainer
        ];
        
        // resourceStore.load();
        eventStore.load();

        me.addEvents(
            'updatelesson'
        );

        me.callParent(arguments);
    }
});