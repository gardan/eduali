Ext.define('Ilc.tasks.training.Planning', {
    extend: 'Ilc.tasks.training.Base',
    xtype: 'planningwindow',

    minWidth: 600,

    requires: [
        'Ilc.scheduler.Training'
    ],

    buttons: [
        {
            text: Ilc.resources.Manager.getResourceString('common.done'),
            handler: function() {
                var me = this.up('window');
                var model = {
                    taskEntityId: me.entity.get('taskObject').id,
                    done: true,
                    lessons: []
                };
                me.fireEvent('addtrainingschedule', me, model);
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.close'),
            handler: function() {
                this.up('window').close();
            }
        }
    ],

    end: function() {

    },

    initComponent: function () {
        var me = this;

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            data: [
                {
                    Id: me.entity.get('taskObject').trainer.id,
                    Name: me.entity.get('taskObject').trainer.name
                }
            ],
        });

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: me.entity.get('taskObject').id
        });

        eventStore.load();

        var onEventCreateOrDragged = function (scheduler) {
            var model = {
                taskEntityId: me.entity.get('taskObject').id,
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

            var i = 0;
            resourceStore.each(function (record) {
                //debugger;


                var events = eventStore.queryBy(function (eventRecord, id) {
                    if (eventRecord.get('Draggable') == true) {
                        return true;
                    }
                });

                Ext.Array.each(events.items, function (event) {

                    i++;
                    var lesson = {};
                    lesson.id = i; // record.get('Id'); // this should actually be the order no.
                    lesson.lessonSchedules = [];

                    var lessonSchedule = {};
                    lessonSchedule.startDate = event.get('StartDate');
                    lessonSchedule.endDate = event.get('EndDate');

                    lesson.lessonSchedules.push(lessonSchedule);

                    model.lessons.push(lesson);
                });


            });

            me.fireEvent('addtrainingschedule', me, model);
        };

        me.items = [
            {
                xtype: 'trainingscheduler',
                anchor: '100%',
                resourceStore: resourceStore,
                eventStore: eventStore,
                onEventCreated: function (newEventRecord) {
                    var trainingLessons = eventStore.queryBy(function (record) {
                        return record.get('Draggable') == true;
                    });

                    var lessonNo = trainingLessons.length + 1;

                    newEventRecord.set('Name', 'Lesson ' + lessonNo);
                },
                listeners: {
                    afterdragcreate: onEventCreateOrDragged,
                    eventdrop: onEventCreateOrDragged
                }
            }
        ];

        me.addEvents(
            'addtrainingschedule'
        );

        me.callParent(arguments);
    }
});