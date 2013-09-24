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

    // viewPreset: 'hourAndDay',

    // Setup your static columns


    constructor: function (args) {
        var me = this;

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:

        Ext.apply(this, {
            columns: [
                { header: Ilc.resources.Manager.getResourceString('common.lessons'), width: 130, dataIndex: 'Name', visible: false }
            ]
        });

        // scrolling to event
        var eventsCombo = Ext.create('Ext.form.ComboBox', {
            store: args.eventStore,
            triggerAction: 'all',
            editable: false,
            queryMode: 'local',
            displayField: 'Name' //,
            // valueField: '',
        });
        me.tbar = [
            eventsCombo,
            {
                text: 'Scroll to event',
                iconCls: 'go',
                handler: function () {
                    var val = eventsCombo.getValue(),
                        // doHighlight = Ext.getCmp('btnHighlight').pressed,
                        rec = args.eventStore.getAt(args.eventStore.find('Name', val));

                    if (rec) {
                        me.getSchedulingView().scrollEventIntoView(rec, true);
                    }
                }
            },
            {
                text : 'Hours',
                toggleGroup : 'presets',
                enableToggle : true,
                iconCls : 'icon-calendar',
                handler : function() {
                    me.switchViewPreset('hourAndDay', me.startDate, me.endDate);
                }
            },
            {
                text         : 'Days',
                toggleGroup  : 'presets',
                enableToggle : true,
                iconCls      : 'icon-calendar',
                handler: function () {
                    me.switchViewPreset('weekAndDay', me.startDate, me.endDate);
                }
            },
            {
                text : 'Weeks',
                toggleGroup : 'presets',
                enableToggle : true,
                iconCls : 'icon-calendar',
                handler : function() {
                    me.switchViewPreset('weekAndMonth', me.startDate, me.endDate);
                }
            },
            '->',
            {
                text: '+',
                scale: 'medium',
                iconCls: 'zoomIn',
                handler: function () {
                    me.zoomIn();
                    console.log(me.calculateCurrentZoomLevel());
                }
            },
            {
                text: '-',
                scale: 'medium',
                iconCls: 'zoomOut',
                handler: function () {
                    me.zoomOut();
                    console.log(me.calculateCurrentZoomLevel());
                }
            }
        ];

        me.zoomLevels = [
            { width: 100, increment: 1, resolution: 1, preset: 'weekAndDay', resolutionUnit: 'HOUR' },
        ];

        me.listeners = {
            eventcontextmenu: function (s, rec, e) {
                e.stopEvent();

                if (!s.ctx) {
                    s.ctx = Ext.create('Ext.menu.Menu', {
                        items: [{
                            text: 'Delete event',
                            iconCls: 'icon-delete',
                            handler: function () {
                                s.eventStore.remove(rec);
                            }
                        }]
                    });
                }
                s.ctx.rec = rec;
                s.ctx.showAt(e.getXY());
            },

            single: true
        };

        me.callParent(arguments);
    }
});