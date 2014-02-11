Ext.define('Ilc.tasks.training.Accepted', {
    extend: 'Ext.window.Window',
    xtype: 'acceptedwindow',

    title: Ilc.resources.Manager.getResourceString('common.planLessons'),
    layout: 'anchor',
    width: 800,

    doneClicked: false,

    doneBtn: null,
    currentLessons: 0,
    trainingEntity: null,


    end: function() {
        var me = this;
        console.log(me);
        if(me.doneClicked) me.close();
    },

    updateDoneBtnTextCounter: function () {
        var doneBtnText = Ilc.resources.Manager.getResourceString('common.done') + ' (' + this.currentLessons + '/' + this.trainingEntity.get('taskObject').lessonsNo + ')';
        this.doneBtn.setText(doneBtnText);
        this.doneBtn.setDisabled(this.currentLessons != this.trainingEntity.get('taskObject').lessonsNo);
    },

    initComponent: function (args) {
        var me = this;
        
        var trainingEntity = me.entity;
        me.trainingEntity = trainingEntity;
        var tasksStore = me.tasksStore;

        var startDate = trainingEntity.get('taskObject').desiredStartDate;

        var doneBtn = Ext.create('Ext.button.Button', {
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
        });

        me.doneBtn = doneBtn;

        var resourceStore = Ext.create('Sch.data.ResourceStore', {         
            data: [
                {
                    Id: trainingEntity.get('taskObject').trainer.id,
                    Name: trainingEntity.get('taskObject').trainer.name
                }
            ],
        });

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: trainingEntity.get('id')
        });

        eventStore.load({
            callback: function () {
                var noOfTrainingLessons = eventStore.queryBy(function (record) {
                    return record.get('Draggable') == true;
                }).items.length;

                me.currentLessons = noOfTrainingLessons;

                me.updateDoneBtnTextCounter();
            }
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
                console.log('fired');
                var resourceModel = resourceStore.getById(newEventRecord.get('ResourceId'));
                
                var trainingLessons = eventStore.queryBy(function (record) {
                    return record.get('Draggable') == true;
                });
                
                me.currentLessons = me.currentLessons + 1;
                me.updateDoneBtnTextCounter();
                newEventRecord.set({
                    Name: 'Lesson ' + (trainingLessons.items.length + 1)
                });
            },
        });

        trainingScheduler.on('beforeeventadd', function (scheduler, newEventRecord) {
            // the no of events that cand be created should be == to the one in the selected offer
            var noOfTrainingLessons = scheduler.eventStore.queryBy(function (record) {
                return record.get('Draggable') == true;
            });
            if (noOfTrainingLessons.items.length >= trainingEntity.get('taskObject').lessonsNo) {
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

            var i = 0;
            resourceStore.each(function(record) {
                //debugger;
                

                var events = eventStore.queryBy(function(eventRecord, id) {
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

            me.fireEvent('addTrainingSchedule', me, model);
        };

        trainingScheduler.on('afterdragcreate', onEventCreateOrDragged);
        trainingScheduler.on('eventdrop', onEventCreateOrDragged);

        me.items = [
            trainingScheduler
            
        ];

        me.buttons = [
            doneBtn,
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

        // resourceStore.load();
        
        me.callParent(arguments);
    },
});