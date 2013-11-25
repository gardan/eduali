Ext.define('Ilc.view.trainings.view.Planning', {
    extend: 'Ext.panel.Panel',
    xtype: 'planningTab',
    
    title: Ilc.resources.Manager.getResourceString('common.planning'),
    entity: null,
    
    scheduler: null,

    initComponent: function (args) {
        var me = this;

        var entity = me.entity;
        var resourceStore = Ext.create('Ilc.store.scheduler.Lessons', {
            trainingId: entity.get('id')
        });

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: entity.get('id')
        });

        var trainingScheduler = Ext.create('Ilc.scheduler.Training', {
            // width: 890,
            // height: 400,

            // startDate: new Date(2013, 10, 24, 6),
            eventResizeHandles: 'none',
            enableDragCreation: false,

            resourceStore: resourceStore,
            eventStore: eventStore,

        });

        me.scheduler = trainingScheduler;
        me.items = [
            trainingScheduler
        ];
        resourceStore.load();
        eventStore.load();
        
        me.callParent(arguments);
    }
});