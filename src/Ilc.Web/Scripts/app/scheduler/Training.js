Ext.define('Ilc.scheduler.Training', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'trainingscheduler',

    allowOverlap: false,
    constrainDragToResource: true,
    snapToIncrement: true,
    eventResizeHandles: 'end',

    scrollToEvent: true, // Visibility for the scroll to event btn and dropdown list

    // orientation: 'vertical',

    // Setup view configuration
    // startDate: startDate,
    // endDate: Sch.util.Date.add(startDate, Sch.util.Date.DAY, 10),

    viewPreset: 'hourAndDayLarge',

    // Setup your static columns

    plugins : [
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

    initComponent: function () {
        var me = this;

        me.addEvents(
            'deletelesson'
        );

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:
        Ext.apply(this, {
            columns: [
                {
                    header: Ilc.resources.Manager.getResourceString('common.stockholders'),
                    width: 130,
                    dataIndex: 'fullName'
                },
                {
                    header: Ilc.resources.Manager.getResourceString('common.stockholders'),
                    width: 130,
                    dataIndex: 'email'
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
                text : 'Date',
                enableToggle : false,
                iconCls: 'icon-calendar',
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                menu: dateMenu
            }
        ];

        me.zoomLevels = [
            // WEEK
            { width: 50, increment: 1, resolution: 30, preset: 'weekAndMonth', resolutionUnit: 'MINUTE' },

            // DAY
            { width: 100, increment: 1, resolution: 30, preset: 'weekAndDay', resolutionUnit: 'MINUTE' },
            
            //HOUR
            { width: 50, increment: 6, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' },
            { width: 50, increment: 1, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' }
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

        me.eventStore.on('add', function() {
            var data = [];
            me.eventStore.each(function (record) {
                if (record.get('Cls') == '') {
                    data.push(record);
                }
            });

            comboStore.loadData(data);
        });

        var func = function() {
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