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
    advanceCalenderMatrix: null,

    setEntity: function (entity) {

        this.entity = entity;
        this.loadResourceStore(this.scheduler.resourceStore, entity);
        this.scheduler.eventStore.reload();
    },

    updateFinished: function () {
        this.fireEvent('updatecomplete');
    },

    lessonCreated: function () {

        this.fireEvent('lessoncreated');
        this.lessonsContainer.lessonsStore.reload();
        this.trainingScheduler.eventStore.reload();

        this.advanceCalenderMatrix.reload(this.lessonsContainer.lessonsStore);
    },

    initLessonsContainer: function () {
        return Ext.create('Ilc.view.lessons.List', {
            training: this.entity,
            columnWidth: 0.2,
            listeners: {
                'selected': this.onLessonsListSelected,
                'aftereditlesson': this.onAfterEditLesson,
                scope: this
            }
        });
    },

    onAfterEditLesson: function (container, record) {
        var rec = this.scheduler.eventStore.getById(record.id);
        rec.set('Name', record.lessonName);
        rec.commit();
    },

    onLessonsListSelected: function (container, record) {

        this.scheduler.getSchedulingView().scrollEventIntoView(record, true);
        this.scheduler.loadAvailabilityZones();

        Ext.getCmp('calendarMatrix1').setValue(record.data.StartDate);
    },

    onLessonRemove: function (store, record, index, isMove, eOpts) {
        var lessonToRemove = this.lessonsContainer.lessonsStore.getById(record.get('Id'));
        this.lessonsContainer.lessonsStore.remove(lessonToRemove);

        this.advanceCalenderMatrix.remove(lessonToRemove);
    },

    onLessonCreated: function (newEventRecord) {

        var container = this.up('planningTab');

        var trainingLessons = this.eventStore.queryBy(function (record) {
            return record.get('Draggable') == true;
        });

        newEventRecord.set({
            Name: 'Lesson ' + (trainingLessons.items.length + 1)
        });

        var model = {
            startDate: newEventRecord.get('StartDate'),
            endDate: newEventRecord.get('EndDate'),
            lessonName: newEventRecord.get('Name'),
            trainingId: container.entity.get('id'),
            ownerId: newEventRecord.get('ResourceId')
        };

        container.fireEvent('createlesson', container, model);
    },

    onCalendarMatrixSelection: function (selectedDate) {

        var me = this;

        var highlightLessons = this.lessonsContainer.lessonsStore.data.items.filter(function (lesson) {
            return lesson.data.StartDate.getDate() === selectedDate.getDate()
            && lesson.data.StartDate.getMonth() === selectedDate.getMonth()
            && lesson.data.StartDate.getFullYear() === selectedDate.getFullYear();
        });

        if (highlightLessons && highlightLessons.length && highlightLessons.length > 0) {

            highlightLessons.forEach(function (lesson) {
                var model = me.lessonsContainer.lessonsStore.getById(lesson.data.Id)
                me.scheduler.getSchedulingView().scrollEventIntoView(model, true);
            });
        }
        else {
            me.scheduler.getSchedulingView().scrollToDate(selectedDate, true);
        }

        me.scheduler.loadAvailabilityZones();
    },

    getResourceStore: function () {
        return Ext.create('Ilc.store.scheduler.Stakeholders');
    },

    loadResourceStore: function (resourceStore, entity) {
        resourceStore.load({
            params: {
                trainingId: entity.get('id')
            }
        });
    },

    initComponent: function (args) {
        var me = this;

        var entity = me.entity;
        var resourceStore = this.getResourceStore();
        this.loadResourceStore(resourceStore, entity);

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: entity.get('id'),
            listeners: {
                remove: me.onLessonRemove,
                scope: me
            }
        });

        var trainingScheduler = Ext.create('Ilc.scheduler.Training', {
            // width: 890,
            height: 300,
            // startDate: new Date(2013, 10, 24, 6),
            eventResizeHandles: 'both',
            // enableDragCreation: false,

            resourceStore: resourceStore,
            eventStore: eventStore,

            onEventCreated: me.onLessonCreated,

            training: entity,
            scrollToEvent: false
        });

        this.trainingScheduler = trainingScheduler;

        trainingScheduler.on('eventresizeend', function (scheduler, record) {

            var model = {
                startDate: record.get('StartDate'),
                endDate: record.get('EndDate'),
                id: record.get('Id'),
                lessonName: record.get('Name'),
                trainingId: entity.get('id')
            };

            me.fireEvent('updatelesson', me, model);
        });

        trainingScheduler.on('eventdrop', function (scheduler, records) {
            // records is an array of record, for now we can only select one event, so just get the first item in the array

            var event = records[0];

            var model = {
                startDate: event.get('StartDate'),
                endDate: event.get('EndDate'),
                id: event.get('Id'),
                lessonName: event.get('Name'),
                trainingId: entity.get('id')
            };

            me.fireEvent('updatelesson', me, model);
        });

        var fields = Ext.create('Ext.form.Panel', {
            width: 600,
            height: 250,
            columnWidth: 0.4,
            bodyStyle: 'padding: 6px',
            labelWidth: 126,
            frame: false,
            border: false,
            labelAlign: 'right',
            defaultType: 'textfield',
            defaults: {
                msgTarget: 'side',
            },
            items: [
                {
                    xtype: 'checkbox',
                    id: 'IsAllday',
                    labelSeparator: ' ',
                    boxLabel: 'All Day',
                    inputValue: 'allDay',
                    listeners: {
                        change: function (checkbox, newVal, oldVal) {

                            if (newVal === true) {
                                Ext.getCmp('timeFrom').disable();
                                Ext.getCmp('timeTo').disable();
                            }
                            else if (newVal === false) {
                                Ext.getCmp('timeFrom').enable();
                                Ext.getCmp('timeTo').enable();
                            }
                        }
                    }
                },
                {
                    id: 'timeFrom',
                    xtype: 'timefield',
                    increment: 15,
                    fieldLabel: 'From',
                    anchor: '100%'
                },
                {
                    id: 'timeTo',
                    xtype: 'timefield',
                    increment: 15,
                    fieldLabel: 'To',
                    anchor: '100%'
                },
                {
                    xtype: 'button',
                    text: 'Generate Lessons',
                    handler: function () {

                        var IsAllDay = Ext.getCmp('IsAllday').value;

                        var timeTo = IsAllDay ? new Date("January 1, 2000 17:00") : Ext.getCmp('timeTo').value;
                        var timeFrom = IsAllDay ? new Date("January 1, 2000 09:00") : Ext.getCmp('timeFrom').value;

                        var selectedDates = Ext.getCmp('calendarMatrix1').selectedDates;

                        var container = this.up('planningTab');

                        var resourceId = 0;

                        if (container.scheduler.selModel.selected.items[0]) {
                            resourceId = container.scheduler.selModel.store.data.items[0].internalId
                        }
                        else {
                            resourceId = container.scheduler.store.data.items[0].internalId;
                        }

                        var lessonCount = 1;
                        $.each(selectedDates, function (key, date) {

                            var datetimeTo = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                                           timeTo.getHours(), timeTo.getMinutes(), timeTo.getSeconds());

                            var datetimeFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                                           timeFrom.getHours(), timeFrom.getMinutes(), timeFrom.getSeconds());

                            var trainingLessons = container.scheduler.eventStore.queryBy(function (record) {
                                return record.get('Draggable') == true;
                            });

                            var model = {
                                startDate: datetimeFrom,
                                endDate: datetimeTo,
                                lessonName: 'Lesson ' + (trainingLessons.items.length + lessonCount),
                                trainingId: container.entity.get('id'),
                                ownerId: resourceId
                            };

                            container.fireEvent('createlesson', container, model);
                            lessonCount++;
                        });

                        me.advanceCalenderMatrix.reload();
                    }
                }
            ]
        });

        me.scheduler = trainingScheduler;
        me.lessonsContainer = me.initLessonsContainer();

        me.advanceCalenderMatrix = Ext.create('Ilc.scheduler.AdvanceDatePicker', {
            id: "calendarMatrix1",
            cls: "calenderMatrix",
            columnWidth: 0.4,
            eventStore: eventStore,
            lessonstore: this.lessonsContainer.lessonsStore,
            handler: function (picker, date) {
                me.onCalendarMatrixSelection(date);
            }
        });

        var calenderMatrixPanel = Ext.create('Ext.panel.Panel', {
            frame: false,
            layout: {
                type: 'column',
            },
            defaults: {
                margin: '0 15 0 0' //top right bottom left (clockwise) margins of each item/column
            },
            items: [
                me.advanceCalenderMatrix,
                fields
            ]
        });

        var Column = Ext.create("Ext.panel.Panel", {
            items: [
                me.scheduler,
                calenderMatrixPanel
            ],
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start',
            },
            frame: false,
            columnWidth: 0.8,
        })

        me.items = [
            Column,
            me.lessonsContainer
        ];

        // resourceStore.load();
        eventStore.load();

        me.addEvents(
            'createlesson',
            'updatelesson',
            'lessoncreated',
            'updatecomplete'
        );

        me.callParent(arguments);
    }
});