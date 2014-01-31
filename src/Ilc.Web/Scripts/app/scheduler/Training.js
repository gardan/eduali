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

    constructor: function (args) {
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

        args.eventStore.on('load', function(records) {
            var data = [];
            args.eventStore.each(function (record) {
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