﻿Ext.define('Ilc.scheduler.Planning', {
    extend: 'Sch.panel.SchedulerGrid',

    requires: [
        'Ilc.model.Availability'
    ],

    eventRenderer: function (eventRecord, resourceRecord, tmplData) {
        var style = 'background-color: ' + eventRecord.get('color');
        tmplData.style = style;

        return eventRecord.get('name');
        // return {
        //     startDate: eventRecord.get('startDate')    
        // };
    },

    // eventBodyTemplate: new Ext.XTemplate(
    //     '<div>' +
    //     'Start date: {startDate}' +
    //     '</div>'
    // ),

    tooltipTpl: new Ext.XTemplate(
        '<div>' +
        'Subject: <b>{subjectName}</b> <br />' +
        'Customer: <b>{customerName}</b>' +
        '</div>'
    ),

    enableDragCreation: false,
    enabledHdMenu: false,
    constrainDragToResource: true,
    allowOverlap: false,

    plugins: [
                new Sch.plugin.Pan({
                    enableVerticalPan: true,
                    
                }),
        new Sch.plugin.HeaderZoom()
    ],

    dndValidatorFn: function (dragRecords, targetResourceRecord, date, duration, e) {
        var scheduler = this.up().up();
        var availabilityStore = scheduler.resourceZones;
        var result = availabilityStore.isResourceAvailable(targetResourceRecord, date, Ext.Date.add(date, Ext.Date.MILLI, duration));

        console.log(result);
        return result;
    },

    loadAvailabilityZones: function() {
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

    initComponent: function() {
        var me = this;

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:
        Ext.apply(this, {
            columns: [
                {
                    header: Ilc.resources.Manager.getResourceString('common.trainer'),
                    width: 130,
                    dataIndex: 'name'
                },
                {
                    header: Ilc.resources.Manager.getResourceString('common.subjects'),
                    width: 130,
                    dataIndex: 'subjects',
                    renderer: function (value) {
                        var ret = '';
                        Ext.Array.forEach(value, function (subject) {
                            ret += subject.name + ', ';
                        });
                        return ret.substring(0, ret.length - 2);
                    }
                }
            ]
        });

        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                me.scrollToDate(date);
                me.loadAvailabilityZones();
            }
        });

        me.tbar = [
            {
                xtype: 'button',
                text: 'Date',
                enableToggle: false,
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                iconCls: 'icon-calendar',
                menu: dateMenu
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
                    me.zoomIn();
                    me.loadAvailabilityZones();
                }
            },
            {
                iconCls: 'icon-zoom-out',
                cls: 'clean-button',
                overCls: 'eduali-menu-hover',
                handler: function () {
                    me.zoomOut();
                    me.loadAvailabilityZones();
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

        var func = function () {
            me.un('afterlayout', func);
            me.goToNow();
            me.zoomToLevel(3);
        };

        me.on('afterlayout', func);
        me.on('eventcontextmenu', this.onEventContextMenu, this);

        var availabilityStore = Ext.create('Ilc.store.scheduler.Availability');
        
        me.resourceZones = availabilityStore;
        me.callParent(arguments);

        me.loadAvailabilityZones();
    },
    
    onEventContextMenu: function (scheduler, eventRecord, e) {
        e.stopEvent();

        var datePicker = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                var diff1 = Sch.util.Date.getDurationInMinutes(eventRecord.get('startDate'), eventRecord.get('endDate'));

                eventRecord.set('startDate', date);
                eventRecord.set('endDate', Sch.util.Date.add(date, Sch.util.Date.MINUTE, diff1));
                scheduler.scrollToDate(date);
            }
        });

        if (!scheduler.ctx) {
            scheduler.ctx = Ext.create('Ext.menu.Menu', {
                items: [{
                    text: 'Move to',
                    enableToggle: false,
                    overCls: 'eduali-menu-hover',
                    iconCls: 'icon-calendar',
                    menu: datePicker
                }]
            });
        }
        scheduler.ctx.rec = eventRecord;
        scheduler.ctx.showAt(e.getXY());
    }
});