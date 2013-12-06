﻿Ext.define('Ilc.scheduler.Training', {
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


    constructor: function (args) {
        var me = this;

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:
        Ext.apply(this, {
            columns: [
                { header: Ilc.resources.Manager.getResourceString('common.trainer'), width: 130, dataIndex: 'Name', visible: false }
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
        
        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                me.scrollToDate(date);
                // Ext.Msg.alert('Date Selected', 'You selected ' + Ext.Date.format(date, 'M j, Y'));
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
                        rec = args.eventStore.getAt(args.eventStore.find('Name', val));

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
                text: 'prev',
                handler: function () {
                    me.shiftPrevious();
                }
            },
            {
                text: 'next',
                handler: function () {
                    me.shiftNext();
                }
            },
            {
                text: '+',
                scale: 'medium',
                iconCls: 'zoomIn',
                handler: function () {
                    me.zoomIn();
                }
            },
            {
                text: '-',
                scale: 'medium',
                iconCls: 'zoomOut',
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
            afterlayout: function () {
                // me.zoomToLevel(4);
            },
            single: true
        };

        me.callParent(arguments);
    }
});