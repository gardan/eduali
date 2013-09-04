Ext.define('Ilc.tasks.training.Accepted', {
    extend: 'Ext.window.Window',
    xtype: 'acceptedwindow',

    title: Ilc.resources.Manager.getResourceString('common.planLessons'),

    constructor: function (args) {
        var me = this;
        
        var trainingEntity = args.entity;

        var resourceStore = Ext.create('Ilc.store.scheduler.Lessons', {
            trainingId: trainingEntity.get('id')
        });

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: trainingEntity.get('id')
        });

        var startDate = new Date(2010, 4, 22, 6);

        var trainingScheduler = Ext.create('Ilc.scheduler.Training', {
            width: 800,
            height: 400,

            // startDate: startDate,
            // endDate: Sch.util.Date.add(startDate, Sch.util.Date.DAY, 10),

            resourceStore: resourceStore,
            eventStore: eventStore,
            
            onEventCreated: function (newEventRecord) {
                newEventRecord.set({
                    Name: "Hey, let's meet",
                    Type: 'Meeting'
                });
            },
        });

        trainingScheduler.on('beforeeventadd', function (scheduler, newEventRecord) {
            // only one event per resource can be created,
            // if one already exists, prevent the new from beeing created.
            var existingEvents = scheduler.eventStore.queryBy(function (record) {
                return record.get('ResourceId') === newEventRecord.get('ResourceId');
            });
            if (existingEvents.items.length > 0) {
                return false;
            }
        });
        
        me.items = [
            trainingScheduler,
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.done'),
                handler: function () {
                    var model = {
                        schedule: [
                            {
                                name: 'Lesson 1',
                                startDate: 'startDate',
                                endDate: 'endDate'
                            }
                        ]
                    };
                    


                    me.fireEvent('addTrainingSchedule', me, model);
                }
            }
        ];

        me.addEvents(
            'addTrainingSchedule'
        );

        resourceStore.load();
        // eventStore.load();
        me.callParent(arguments);
    },
});