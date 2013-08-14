Ext.define('Ilc.tasks.training.Accepted', {
    extend: 'Ext.window.Window',
    xtype: 'acceptedwindow',

    constructor: function () {
        var me = this;

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            model: 'Sch.model.Resource'
        });

        resourceStore.loadData([
            {
                Id: 'a',
                Name: 'Lesson 1'
            },
            {
                Id: 'b',
                Name: 'Lesson 2'
            },
            {
                Id: 'c',
                Name: 'Lesson 3'
            }
        ]);

        // Store holding all the events
        var eventStore = Ext.create('Sch.data.EventStore', {
            model: 'Sch.model.Event',

            data: []
        });

        var startDate = new Date(2010, 4, 22, 6);
        var slider;
        var trainingScheduler = Ext.create('Sch.panel.SchedulerGrid', {
            width: 800,
            height: 400,

            allowOverlap: false,
            constrainDragToResource: true,
            snapToIncrement: true,
            eventResizeHandles: 'end',      

            // orientation: 'vertical',

            // Setup view configuration
            startDate: startDate,
            // endDate: Sch.util.Date.add(startDate, Sch.util.Date.DAY, 10),

            viewPreset: 'hourAndDay',

            // Setup your static columns
            columns: [
                { header: 'Staff', width: 130, dataIndex: 'Name', visible: false }
            ],

            resourceStore: resourceStore,
            eventStore: eventStore,
            
            onEventCreated: function (newEventRecord) {
                newEventRecord.set({
                    Name: "Hey, let's meet",
                    Type: 'Meeting'
                });
            },

            listeners: {
                eventcontextmenu: function (s, rec, e) {
                e.stopEvent();
                
                if (!s.ctx) {
                    s.ctx = new Ext.menu.Menu({
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
                    slider.setMinValue(10);
                    slider.setMaxValue(14);

                    slider.setValue(trainingScheduler.getCurrentZoomLevelIndex());
                },
                
                single: true
            },

            // zooming
            bbar: [
                slider = Ext.create('Ext.slider.SingleSlider', {
                    style: 'margin-left:10px',
                    width: 100,
                    value: 0,
                    increment: 1,
                    minValue: 0,
                    maxValue: 10,
                    listeners: {
                        change: function (p, v) {
                            trainingScheduler.zoomToLevel(parseInt(v), true);
                        }
                    }
                })
            ]
        });

        trainingScheduler.on('beforeeventadd', function (scheduler, newEventRecord) {
            // only one event per resource can be created,
            // if one already exists, prevent the new from beeing created.
            var existingEvents = scheduler.eventStore.queryBy(function (record) {
                return record.get('ResourceId') === newEventRecord.get('ResourceId');
            });
            if (existingEvents.items.length > 0) {
                return false;
            }
        });
        
        me.items = [
            trainingScheduler,
            {
                xtype: 'button',
                text: 'Done',
                handler: function () {
                    var model = {
                        schedule: [
                            {
                                name: 'Lesson 1',
                                startDate: 'startDate',
                                endDate: 'endDate'
                            }
                        ]
                    };
                    


                    me.fireEvent('addTrainingSchedule', me, model);
                }
            }
        ];

        me.addEvents(
            'addTrainingSchedule'
        );

        me.callParent(arguments);
    },
});