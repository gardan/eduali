Ext.define('Ilc.view.planning.Default', {
    extend: 'Ext.container.Container',
    xtype: 'globalplanning',

    requires: [
        'Ilc.model.Training'
    ],

    updateFinished: function() {
        console.log('update finished');
    },

    initComponent: function() {
        var me = this;

        Ext.define('Ilc.model.scheduler.Lesson', {
            extend: 'Sch.model.Event',
            
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' },
                { name: 'resourceId', type: 'int' },
                { name: 'trainingId', type: 'int' },
                { name: 'startDate', type: 'date', dateFormat: 'c' },
                { name: 'endDate', type: 'date', dateFormat: 'c' },
                { name: 'color', type: 'string' },
                { name: 'customerName', type: 'string' },
                { name: 'subjectName', type: 'string' }
            ],
             
            idProperty: 'id',
            nameField: 'name',
            startDateField: 'startDate',
            endDateField: 'endDate',
            resourceIdField: 'resourceId'
        });

        Ext.define('Ilc.model.scheduler.Trainer', {
            extend: 'Sch.model.Resource',
            
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' }
            ],
            // 
            idProperty: 'id',
            nameField: 'name'
        });

        var trainersStore = Ext.create('Sch.data.ResourceStore', {
            model: 'Ilc.model.scheduler.Trainer',
                      
            proxy: {
                type: 'rest',
                url: 'api/trainers',
                extraParams: {
                    format: 'json'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalRecords'
                }
            }
        });
        
        var eventlessonsStore = Ext.create('Sch.data.EventStore', {
            model: 'Ilc.model.scheduler.Lesson',
          
            // data: {
            //     root: [
            //         JSON.parse('{"id":1,"resourceId":1,"name":"Lesson 1","startDate":"2013-11-22T05:00:00.0000000+00:00","endDate":"2013-11-22T07:00:00.0000000+00:00","color":"#11C935","customerName":"Ilc","subjectName":"English","trainingId":1}')
            //     ]
            // }

            proxy: {
                type: 'rest',
                url: 'api/lessons',
                extraParams: {
                    format: 'json'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalRecords'
                }
            }
        });
        
        var planningScheduler = Ext.create('Ilc.scheduler.Planning', {
            resourceStore: trainersStore,
            eventStore: eventlessonsStore,
            viewPreset: 'hourAndDay',
            
            eventResizeHandles: 'none',
            // startDate: new Date('11-09-2013T10:00:00'),
            // endDate: new Date('11-16-2013T12:00:00')
        });

        planningScheduler.on('eventdblclick', function(scheduler, eventRecord, e, eOpts) {
            scheduler.mask();

            var trainingId = eventRecord.get('trainingId');
            Ext.ModelManager.getModel('Ilc.model.Training').load(trainingId, {
                success: function (training) {
                    scheduler.unmask();
                    
                    var window = Ext.create('Ilc.view.trainings.View', {
                        closeAction: 'destroy',
                        modal: true,
                        model: training
                    }).show();

                }
            });
        });

        planningScheduler.on('eventdrop', function (scheduler, records) {
            // records is an array of record, for not we can only select one event, so just get the first item in the array
            var event = records[0];
            
            var model = {
                startDate: event.get('startDate'),
                endDate: event.get('endDate'),
                id: event.get('id'),
                trainingId: event.get('trainingId')
            };

            me.fireEvent('updatelesson', me, model);
        });

        me.items = [
            planningScheduler
        ];

        me.addEvents(
            'updatelesson'
        );

        trainersStore.load();
        eventlessonsStore.load();

        me.callParent(arguments);
    }
});