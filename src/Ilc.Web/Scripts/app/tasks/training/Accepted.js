﻿Ext.define('Ilc.tasks.training.Accepted', {
    extend: 'Ext.window.Window',
    xtype: 'acceptedwindow',

    title: Ilc.resources.Manager.getResourceString('common.planLessons'),
    layout: 'anchor',
    width: 800,

    doneClicked: false,

    end: function() {
        var me = this;
        console.log(me);
        if(me.doneClicked) me.close();
    },

    constructor: function (args) {
        var me = this;
        
        var trainingEntity = args.entity;
        var tasksStore = args.tasksStore;

        var startDate = trainingEntity.get('taskObject').desiredStartDate;

        var resourceStore = Ext.create('Ilc.store.scheduler.Lessons', {
            trainingId: trainingEntity.get('id')
        });

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: trainingEntity.get('id')
        });

        var d1 = new Date(startDate);
        
        var d = new Date(d1.getUTCFullYear(),
                       d1.getUTCMonth(),
                       d1.getUTCDate(),
                       d1.getUTCHours(),
                       d1.getUTCMinutes(),
                       d1.getUTCSeconds());
        
        // var d = new Date('2013-10-27T02:00:00');
        var d2 = new Date();
        var trainingScheduler = Ext.create('Ilc.scheduler.Training', {
            anchor: '100%',
            height: 400,

            //startDate: new Date(startDate),
            startDate: d,
            // endDate: Sch.util.Date.add(new Date(startDate), Sch.util.Date.MONTH, 3),

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
                return record.get('Draggable') == true && record.get('ResourceId') === newEventRecord.get('ResourceId');
            });
            if (existingEvents.items.length > 0) {
                return false;
            }
        });

        var onEventCreateOrDragged = function(scheduler) {
            var model = {
                taskEntityId: trainingEntity.get('id'),
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

            resourceStore.each(function(record) {
                //debugger;
                var lesson = {};
                lesson.id = record.get('Id');
                lesson.lessonSchedules = [];

                var events = eventStore.queryBy(function(eventRecord, id) {
                    if (eventRecord.get('Draggable') == true &&  eventRecord.get('ResourceId') == record.get('Id')) {
                        return true;
                    }
                });

                Ext.Array.each(events.items, function(event) {
                    var lessonSchedule = {};
                    lessonSchedule.startDate = event.get('StartDate');
                    lessonSchedule.endDate = event.get('EndDate');

                    lesson.lessonSchedules.push(lessonSchedule);
                });

                model.lessons.push(lesson);
            });

            me.fireEvent('addTrainingSchedule', me, model);
        };

        trainingScheduler.on('afterdragcreate', onEventCreateOrDragged);
        trainingScheduler.on('eventdrop', onEventCreateOrDragged);

        me.items = [
            trainingScheduler
            
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.done'),
                handler: function () {
                    var model = {
                        taskEntityId: trainingEntity.get('id'),
                        lessons: []
                    };

                    me.doneClicked = true;

                    me.fireEvent('addTrainingSchedule', me, model, {
                        tasksStore: tasksStore
                    });
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.close'),
                handler: function() {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addTrainingSchedule'
        );

        resourceStore.load();
        eventStore.load();
        me.callParent(arguments);
    },
});