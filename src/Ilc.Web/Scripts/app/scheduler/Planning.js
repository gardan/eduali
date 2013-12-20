Ext.define('Ilc.scheduler.Planning', {
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

    plugins: [
                new Sch.plugin.Pan({
                    enableVerticalPan: true
                })
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

        var startDate = Sch.util.Date.add(me.getStartDate(), Sch.util.Date.DAY, -2);
        var endDate = Sch.util.Date.add(me.getEndDate(), Sch.util.Date.DAY, 2);

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
                }
            ]
        });

        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                me.scrollToDate(date);
            }
        });

        me.tbar = [
            {
                xtype: 'button',
                text: 'Date',
                enableToggle: false,
                iconCls: 'icon-calendar',
                menu: dateMenu
            },
            {
                iconCls: 'icon-left',
                handler: function () {
                    me.shiftPrevious();
                    me.loadAvailabilityZones();
                }
            },
            {
                iconCls: 'icon-right',
                handler: function () {
                    me.shiftNext();
                    me.loadAvailabilityZones();
                }
            },
            {
                iconCls: 'icon-zoom-in',
                handler: function () {
                    me.zoomIn();
                    me.loadAvailabilityZones();
                }
            },
            {
                iconCls: 'icon-zoom-out',
                handler: function () {
                    me.zoomOut();
                    me.loadAvailabilityZones();
                }
            }
        ];

        var availabilityStore = Ext.create('Sch.data.EventStore', {
            model: 'Ilc.model.Availability',
            
            // data: [
            //     { id: 1, resourceId: 2, startDate: "2013-12-11T08:00:00", endDate: "2013-12-11T12:00:00" },
            //     { id: 2, resourceId: 3, startDate: "2013-12-11T08:00:00", endDate: "2013-12-11T12:00:00" }
            //     // { ResourceId: 2, StartDate: "2011-09-01T10:00", EndDate: "2011-09-01T16:00" }
            // ],

            proxy: {
                type: 'rest',
                url: 'api/availabilities',
                extraParams: {
                    format: 'json'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalRecords'
                }
            },
            
            isResourceAvailable: function (resource, start, end) {
                var availability = this.getEventsForResource(resource);

                if (!availability || availability.length === 0) return true;

                for (var i = 0; i < availability.length; i++) {
                    console.log(availability[i].getStartDate());
                    console.log(availability[i].getEndDate());
                    console.log(start);
                    console.log(end);
                    if (Sch.util.Date.timeSpanContains(availability[i].getStartDate(), availability[i].getEndDate(), start, end)) {
                        return true;
                    }
                }

                return false;
            }
        });
        
        // availabilityStore.load();

        
        me.resourceZones = availabilityStore;
        me.callParent(arguments);

        me.loadAvailabilityZones();
    }
});