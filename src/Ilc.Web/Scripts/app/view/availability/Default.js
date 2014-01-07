﻿Ext.define('Ilc.view.availability.Default', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.scheduler.Availability'
    ],

    initComponent: function() {
        var me = this;

        var trainerId = Ilc.Configuration.get().trainerId;
        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            data: [
                { Id: trainerId, Name: 'Trainer Name' }
            ]
        });
        var availabilitiesStore = Ext.create('Ilc.store.scheduler.Availability');

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