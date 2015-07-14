Ext.define('Ilc.view.availability.Default', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.scheduler.Availability'
    ],

    initComponent: function() {
        var me = this;

        var resourceStore = Ext.create('Ilc.store.scheduler.Stakeholders');
        var availabilitiesStore = Ext.create('Ilc.store.scheduler.Availability');

        me.items = [
            {
                xtype: 'availabilityscheduler',
                resourceStore: resourceStore,
                eventStore: availabilitiesStore
            }
        ];


        resourceStore.load = R.wrap(resourceStore.load, function (wrapped, options) {
            options = options || {};
            options.params = options.params || {};

            options.params.claims = 'tasks-trainer';
            wrapped.call(resourceStore, options);
        });
        resourceStore.load({});
        me.callParent(arguments);
    }
});