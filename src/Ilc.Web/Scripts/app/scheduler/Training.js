Ext.define('Ilc.scheduler.Training', {
    extend: 'Sch.panel.SchedulerGrid',

    allowOverlap: false,
    constrainDragToResource: true,
    snapToIncrement: true,
    eventResizeHandles: 'end',

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
                })
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

        var startDate = Sch.util.Date.add(me.getStartDate(), Sch.util.Date.DAY, -2);
        var endDate = Sch.util.Date.add(me.getEndDate(), Sch.util.Date.DAY, 2);

        availabilityStore.load({
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    },

    initComponent: function () {
        var me = this;

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:
        Ext.apply(this, {
            columns: [
                { header: Ilc.resources.Manager.getResourceString('common.trainer'), width: 130, dataIndex: 'Name', visible: false }
            ]
        });

        var comboStore = Ext.create('Ext.data.Store', {
            fields: ['Name', 'Cls']
        });

        me.eventStore.on('load', function(records) {
            var data = [];
            me.eventStore.each(function (record) {
                if (record.get('Cls') == '') {
                    data.push(record);
                }
            });

            comboStore.loadData(data);
        });

        // scrolling to event
        var eventsCombo = Ext.create('Ext.form.ComboBox', {
            store: comboStore,
            triggerAction: 'all',
            editable: false,
            queryMode: 'local',
            displayField: 'Name' //,
            // valueField: '',
        });
        
        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                me.scrollToDate(date);
            }
        });

        me.tbar = [
            eventsCombo,
            {
                text: 'Scroll to event',
                iconCls: 'go',
                handler: function () {
                    var val = eventsCombo.getValue(),
                        // doHighlight = Ext.getCmp('btnHighlight').pressed,
                        rec = me.eventStore.getAt(me.eventStore.find('Name', val));

                    if (rec) {
                        me.getSchedulingView().scrollEventIntoView(rec, true);
                    }
                }
            },
            {
                xtype: 'button',
                text : 'Date',
                enableToggle : false,
                iconCls : 'icon-calendar',
                menu: dateMenu
            },
            '->',
            {
                iconCls: 'icon-left',
                handler: function () {
                    me.shiftPrevious();
                }
            },
            {
                iconCls: 'icon-right',
                handler: function () {
                    me.shiftNext();
                }
            },
            {
                iconCls: 'icon-zoom-in',
                handler: function () {
                    me.zoomIn();
                }
            },
            {
                iconCls: 'icon-zoom-out',
                handler: function () {
                    me.zoomOut();
                }
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

        me.listeners = {
            /// Commented out because we can't yet delete or add lessons/
            // eventcontextmenu: function (s, rec, e) {
            //     e.stopEvent();
            // 
            //     if (!s.ctx) {
            //         s.ctx = Ext.create('Ext.menu.Menu', {
            //             items: [{
            //                 text: 'Delete event',
            //                 iconCls: 'icon-delete',
            //                 handler: function () {
            //                     s.eventStore.remove(rec);
            //                 }
            //             }]
            //         });
            //     }
            //     s.ctx.rec = rec;
            //     s.ctx.showAt(e.getXY());
            // },
            afterlayout: function () {
                // me.zoomToLevel(4);
            },
            single: true
        };

        var availabilityStore = Ext.create('Ilc.store.scheduler.Availability');

        me.resourceZones = availabilityStore;
        me.callParent(arguments);
        
        me.loadAvailabilityZones();
    }
});