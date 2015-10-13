Ext.define('Ilc.scheduler.Training', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'trainingscheduler',

    allowOverlap: false,
    constrainDragToResource: false,
    snapToIncrement: true,
    eventResizeHandles: 'end',

    scrollToEvent: true, // Visibility for the scroll to event btn and dropdown list

    // orientation: 'vertical',

    // Setup view configuration
    // startDate: startDate,
    // endDate: Sch.util.Date.add(startDate, Sch.util.Date.DAY, 10),

    viewPreset: 'hourAndDayLarge',

    // Setup your static columns

    plugins: [
                new Sch.plugin.Pan({
                    enableVerticalPan: true,
                    disableOnKey: Sch.plugin.Pan.KEY_SHIFT
                }),
                new Sch.plugin.HeaderZoom()
    ],

    createValidatorFn: function (resourceRecord, startDate, endDate, e) {
        var scheduler = this.up().up();
        var availabilityStore = scheduler.resourceZones;
        var result = availabilityStore.isResourceAvailable(resourceRecord, startDate, endDate);

        return result;
    },

    dndValidatorFn: function (dragRecords, targetResourceRecord, date, duration, e) {
        var scheduler = this.up().up();
        var availabilityStore = scheduler.resourceZones;
        var result = availabilityStore.isResourceAvailable(targetResourceRecord, date, Ext.Date.add(date, Ext.Date.MILLI, duration));

        return result;
    },

    loadAvailabilityZones: function () {
        var me = this;
        var availabilityStore = me.resourceZones;

        var startDate = Sch.util.Date.add(me.getStartDate(), Sch.util.Date.DAY, -10);
        var endDate = Sch.util.Date.add(me.getEndDate(), Sch.util.Date.DAY, 10);

        availabilityStore.load({
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    },

    eventRenderer: function (event, resource, templateData) {
        var color = this.ownerCt.ownerCt.training.get('color');
        templateData.style = 'background-color: #' + color;
        return event.get('Name');
    },

    initComponent: function () {
        var me = this;

        me.addEvents(
            'deletelesson'
        );

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:
        Ext.apply(this, {
            columns: [
                {
                    header: Ilc.resources.Manager.getResourceString('common.stakeholders'),
                    width: 130,
                    dataIndex: 'fullName'
                },
                {
                    header: Ilc.resources.Manager.getResourceString('common.roles'),
                    width: 100,
                    dataIndex: 'roles',
                    renderer: function (value) {
                        return R.map(R.prop('name'), value).join(',');
                    }
                },
                {
                    xtype: 'actioncolumn',
                    //text: Ilc.resources.Manager.getResourceString('common.actions'),
                    width: 25,
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/remove.png',
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {

                                Ilc.AsyncHelpers.confirmModal()
                                    .then(function () {

                                        var model = { stakeholders: [] };
                                        model.stakeholders.push(record.raw);

                                        var addStakeholderModel = Ext.create('Ilc.model.stakeholders.Add', {
                                            stakeholders: R.map(R.prop('id'), model.stakeholders),
                                            trainingId: me.training.get('id'),
                                            IsRemove: true
                                        });

                                        addStakeholderModel.save({
                                            success: function () {
                                                me.resourceStore.reload();
                                            },
                                            error: function () {

                                            }
                                        });
                                    });
                            }
                        }
                    ]
                }
            ]
        });

        var comboStore = Ext.create('Ext.data.Store', {
            fields: ['Name', 'Cls']
        });

        if (me.scrollToEvent) {
            me.eventStore.on('load', function (records) {
                var data = [];
                me.eventStore.each(function (record) {
                    if (record.get('Cls') == '') {
                        data.push(record);
                    }
                });

                comboStore.loadData(data);
            });
        }

        // scrolling to event
        var eventsCombo = Ext.create('Ext.form.ComboBox', {
            store: comboStore,
            triggerAction: 'all',
            editable: false,
            queryMode: 'local',
            displayField: 'Name', //,
            hidden: !me.scrollToEvent,
            valueField: 'Id'
        });

        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                me.scrollToDate(date);
                me.loadAvailabilityZones();
            }
        });

        me.tbar = [
            eventsCombo,
            {
                hidden: !me.scrollToEvent,
                text: 'Scroll to event',
                iconCls: 'go',
                handler: function () {
                    var val = eventsCombo.getValue(),
                        // doHighlight = Ext.getCmp('btnHighlight').pressed,
                        rec = me.eventStore.getAt(me.eventStore.find('Id', val));

                    if (rec) {
                        me.getSchedulingView().scrollEventIntoView(rec, true);
                        me.loadAvailabilityZones();
                    }
                }
            },
            {
                iconCls: 'icon-left',
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                handler: function () {
                    me.shiftPrevious();
                    me.loadAvailabilityZones();
                }
            },
            {
                iconCls: 'icon-right',
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                handler: function () {
                    me.shiftNext();
                    me.loadAvailabilityZones();
                }
            },
            {
                iconCls: 'icon-zoom-in',
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                handler: function () {
                    console.log(me.zoomIn());
                    me.loadAvailabilityZones();
                }
            },
            {
                iconCls: 'icon-zoom-out',
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                handler: function () {
                    console.log(me.zoomOut());
                    me.loadAvailabilityZones();
                }
            },
            {
                xtype: 'button',
                text: 'Date',
                enableToggle: false,
                iconCls: 'icon-calendar',
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                menu: dateMenu
            },
            {
                xtype: 'button',
                text: 'Add stakeholders',
                handler: function () {
                    var stakeholderAddWindow = Ext.create('Ilc.view.stakeholders.Add', {
                        training: me.training,
                        listeners: {
                            'added-stakeholders': function () {
                                me.resourceStore.reload();
                                stakeholderAddWindow.close();

                            }
                        }
                    }).show();
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Language',
                hideLabel: true,
                emptyText: 'Generate PDF',
                store: Ext.create('Ilc.store.FileTemplates'),
                displayField: 'name',
                valueField: 'id',
                listeners: {
                    'select': function (combo, records) {

                        var name = records[0].data.name;
                        var template = records[0].data.content;

                        var trainings = this.up('planningTab').entity.raw;
                        trainings.lessons = [];

                        var tabPanel = this.up('tabpanel');
                        var lessons = tabPanel.items.items.filter(function (item) { return item.title == "Lessons" })[0].store.data.items;

                        var totaal = trainings.totalHours;
                        lessons.forEach(function (lesson) {

                            var modelLesson = {};
                            modelLesson.Name = lesson.raw.Name;
                            modelLesson.timeDifference = DateDifference(lesson.raw.StartDate, lesson.raw.EndDate);
                            totaal = totaal - modelLesson.timeDifference;
                            modelLesson.total = totaal;

                            modelLesson.StartTime = GetTime(lesson.raw.StartDate);
                            modelLesson.EndTime = GetTime(lesson.raw.EndDate);

                            modelLesson.StartDate = GetDate(lesson.raw.StartDate);
                            modelLesson.EndDate = GetDate(lesson.raw.EndDate);

                            trainings.lessons.push(modelLesson);
                        });

                        function GetTime(datetime) {

                            var d = new Date();
                            var localTimeOffset = d.getTimezoneOffset() * 60000;
                            var date = new Date(Date.parse(datetime) + localTimeOffset);

                            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                            var mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

                            return hours + ":" + mins;
                        }

                        function GetDate(datetime) {
                            var d = new Date(datetime);

                            var month = (d.getUTCMonth() + 1 < 10) ? "0" + (d.getUTCMonth() + 1) : d.getUTCMonth() + 1;
                            var day = (d.getUTCDate() < 10) ? "0" + d.getUTCDate() : d.getUTCDate();
                            var year = (d.getUTCFullYear() < 10) ? "0" + d.getUTCFullYear() : d.getUTCFullYear();

                            return day + "-" + month + "-" + year;
                        }

                        function DateDifference(startDate, endDate) {

                            var date1 = new Date(startDate);
                            var date2 = new Date(endDate);
                            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                            var diffDays = timeDiff / (1000 * 3600);

                            return diffDays;
                        }

                        Handlebars.registerHelper('DateDifference', DateDifference);

                        var intlData = {
                            "locales": "en-US",
                            "formats": { "date": { "short": { "day": "numeric", "month": "numeric", "year": "numeric" }, "hhmm": { "hour": "numeric", "minute": "numeric" } } }
                        };

                        var compiledTemplate = Handlebars.compile(template);

                        var resulthtml = compiledTemplate(trainings, {
                            data: { intl: intlData }
                        });
                        var div = $('<div></div>').html(resulthtml);

                        var pdf = new jsPDF('p', 'pt', 'letter');

                        var margins = { top: 80, bottom: 60, left: 40, width: 522 };
                        var specialElementHandlers = { '#bypassme': function (element, renderer) { return true; } };
                        var options = { 'width': margins.width, 'elementHandlers': specialElementHandlers };
                        var SavePDF = function (dispose) { pdf.save(name + '.pdf'); }

                        pdf.fromHTML(div.html(), margins.left, margins.top, options, SavePDF, margins);
                    }
                }
            }
        ];

        me.zoomLevels = [
            // WEEK
            { width: 50, increment: 1, resolution: 15, preset: 'weekAndMonth', resolutionUnit: 'MINUTE' },

            // DAY
            { width: 100, increment: 1, resolution: 15, preset: 'weekAndDay', resolutionUnit: 'MINUTE' },

            //HOUR
            { width: 50, increment: 6, resolution: 15, preset: 'hourAndDay', resolutionUnit: 'MINUTE' },
            { width: 50, increment: 1, resolution: 15, preset: 'hourAndDay', resolutionUnit: 'MINUTE' }
        ];

        me.on('eventcontextmenu', function (scheduler, eventRecord, e) {
            e.stopEvent();

            if (!scheduler.ctx) {
                scheduler.ctx = Ext.create('Ext.menu.Menu', {
                    items: [{
                        text: 'Delete event',
                        iconCls: 'icon-delete',
                        handler: function () {

                            var model = {
                                id: scheduler.ctx.rec.get('Id')
                            };

                            me.fireEvent('deletelesson', scheduler, model);
                            scheduler.eventStore.remove(scheduler.ctx.rec);
                        }
                    }]
                });
            }

            scheduler.ctx.rec = eventRecord;
            scheduler.ctx.showAt(e.getXY());
        });

        me.eventStore.on('add', function () {
            var data = [];
            me.eventStore.each(function (record) {
                if (record.get('Cls') == '') {
                    data.push(record);
                }
            });

            comboStore.loadData(data);
        });

        var func = function () {
            me.un('afterlayout', func);
            me.goToNow();
            me.zoomToLevel(3);
            me.loadAvailabilityZones();
        };

        me.on('afterlayout', func);

        var availabilityStore = Ext.create('Ilc.store.scheduler.Availability');

        me.resourceZones = availabilityStore;
        me.callParent(arguments);
    }
});