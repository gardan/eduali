Ext.define('Ilc.view.planning.Default', {
    extend: 'Ext.container.Container',
    
    initComponent: function() {
        var me = this;

        Ext.define('Ilc.model.scheduler.Lesson', {
            extend: 'Sch.model.Event',
            
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' },
                { name: 'resourceId', type: 'int' },
                { name: 'startDate', type: 'date', dateFormat: 'c' },
                { name: 'endDate', type: 'date', dateFormat: 'c' },
                { name: 'color', type: 'string' }
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

            // data: [
            //     { id: 1, name: 'Lesson 1', resourceId: 1, startDate: '2013-11-10T10:00:00', endDate: '2013-11-10T12:00:00' },
            //     { id: 2, name: 'Lesson 2', resourceId: 1, startDate: '2013-11-11T10:00:00', endDate: '2013-11-11T12:00:00' },
            //     { id: 3, name: 'Lesson 3', resourceId: 2, startDate: '2013-11-12T10:00:00', endDate: '2013-11-12T12:00:00' },
            //     { id: 4, name: 'Lesson 4', resourceId: 2, startDate: '2013-11-13T10:00:00', endDate: '2013-11-13T12:00:00' },
            //     { id: 5, name: 'Lesson 5', resourceId: 3, startDate: '2013-11-14T10:00:00', endDate: '2013-11-14T12:00:00' },
            //     { id: 6, name: 'Lesson 6', resourceId: 3, startDate: '2013-11-15T10:00:00', endDate: '2013-11-15T12:00:00' }
            // ],
            
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
            viewPreset: 'hourAndDay'
            // startDate: new Date('11-09-2013T10:00:00'),
            // endDate: new Date('11-16-2013T12:00:00')
        });

        me.items = [
            planningScheduler
        ];

        trainersStore.load();
        eventlessonsStore.load();

        me.callParent(arguments);
    }
});