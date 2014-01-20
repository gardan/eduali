Ext.define('Ilc.view.availability.Default', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.scheduler.Availability'
    ],

    initComponent: function() {
        var me = this;

        var resourceStore = Ext.create('Ilc.store.scheduler.Trainers');
        var availabilitiesStore = Ext.create('Ilc.store.scheduler.Availability');

        me.items = [
            {
                xtype: 'availabilityscheduler',
                resourceStore: resourceStore,
                eventStore: availabilitiesStore
            }
        ];


        resourceStore.load();
        me.callParent(arguments);
    }
});