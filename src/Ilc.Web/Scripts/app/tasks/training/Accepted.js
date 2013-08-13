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
            },
            {
                Id: 'd',
                Name: 'Lesson 4'
            },
            {
                Id: 'e',
                Name: 'Lesson 5'
            }
        ]);

        // Store holding all the events
        var eventStore = Ext.create('Sch.data.EventStore', {
            model: 'Sch.model.Event',

            data: []
        });

        var startDate = new Date(2010, 4, 22, 6);
        var slider;
        var scheduler = Ext.create('Sch.panel.SchedulerGrid', {
            width: 800,
            height: 400,

            snapToIncrement: true,
            eventResizeHandles: 'end',      

            orientation: 'vertical',

            // Setup view configuration
            startDate: startDate,
            endDate: Sch.util.Date.add(startDate, Sch.util.Date.DAY, 4),

            viewPreset: 'hourAndDay',

            // Setup your static columns
            columns: [
                { header: 'Staff', width: 130, dataIndex: 'Name', visible: false }
            ],

            resourceStore: resourceStore,
            eventStore: eventStore,
            
            onEventCreated: function (newEventRecord) {
                newEventRecord.set({
                    Title: "Hey, let's meet",
                    Type: 'Meeting'
                });
            },

            listeners: {
                afterlayout: function () {
                    slider.setMinValue(10);
                    slider.setMaxValue(14);

                    slider.setValue(scheduler.getCurrentZoomLevelIndex());
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
                            scheduler.zoomToLevel(parseInt(v), true);
                        }
                    }
                })
            ]
        });

        scheduler.on('eventresizeend', function () {
            console.log('eventresizeend');
        });

        scheduler.on('eventresizestart', function () {
            console.log('eventresizestart');
        });
        
        me.items = [
            scheduler
        ];

        me.callParent(arguments);
    },

    html: '<h3>This is the Accepted window!!</h3>'
});