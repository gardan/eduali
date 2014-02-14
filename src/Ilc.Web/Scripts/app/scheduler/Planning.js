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
                me.loadAvailabilityZones();
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

        var availabilityStore = Ext.create('Ilc.store.scheduler.Availability');
        
        me.resourceZones = availabilityStore;
        me.callParent(arguments);

        me.loadAvailabilityZones();
    }
});