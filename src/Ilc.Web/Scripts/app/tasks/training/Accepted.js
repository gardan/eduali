﻿Ext.define('Ilc.tasks.training.Accepted', {
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

        var trainingScheduler = Ext.create('Ilc.scheduler.Training', {
            width: 800,
            height: 400,

            // startDate: startDate,
            // endDate: Sch.util.Date.add(startDate, Sch.util.Date.DAY, 10),

            resourceStore: resourceStore,
            eventStore: eventStore,
            
            onEventCreated: function (newEventRecord) {
                var resourceModel = resourceStore.getById(newEventRecord.get('ResourceId'));
                
                newEventRecord.set({
                    Name: resourceModel.get('Name')
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
                        lessons: [
                        //    {
                        //        id: 1,
                        //        lessonSchedules: [
                        //            {
                        //                startDate: 'startDate',
                        //                endDate: 'endDate'
                        //            }
                        //        ]
                        //    }
                        ]
                    };

                    resourceStore.each(function (record) {
                        //debugger;
                        var lesson = {};
                        lesson.id = record.get('Id');
                        lesson.lessonSchedules = [];

                        var events = eventStore.queryBy(function (eventRecord, id) {
                            if (eventRecord.get('ResourceId') == record.get('Id')) {
                                return true;
                            }
                        });
                        //debugger;
                        Ext.Array.each(events.items, function (event) {
                            var lessonSchedule = {};
                            lessonSchedule.startDate = event.get('StartDate');
                            lessonSchedule.endDate = event.get('EndDate');
                            
                            lesson.lessonSchedules.push(lessonSchedule);
                        });

                        model.lessons.push(lesson);
                    });

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