Ext.define('Ilc.view.availability.Default', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.scheduler.Availability'
    ],

    initComponent: function() {
        var me = this;

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            data: [
                { Id: 1, Name: 'Trainer Name' }
            ]
        });
        var availabilitiesStore = Ext.create('Sch.data.EventStore', {
            data: [
                { Id: 1, ResourceId: 1, StartDate: '2013-12-20T12:00:00', EndDate: '2013-12-20T18:00:00', Name: '2013-12-20T12:00:00 - 2013-12-20T18:00:00' }
            ]
        });

        me.items = [
            {
                xtype: 'availabilityscheduler',
                resourceStore: resourceStore,
                eventStore: availabilitiesStore
            }
        ];

        me.callParent(arguments);
    }
});