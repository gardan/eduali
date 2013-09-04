Ext.define('Ilc.view.trainings.view.Planning', {
    extend: 'Ext.panel.Panel',
    xtype: 'planningTab',
    
    title: Ilc.resources.Manager.getResourceString('common.planning'),
    
    constructor: function (args) {
        var me = this;

        var entity = args.entity;
        var resourceStore = Ext.create('Ilc.store.scheduler.Lessons', {
            trainingId: entity.get('id')
        });

        // Store holding all the events
        var eventStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: entity.get('id')
        });

        var trainingScheduler = Ext.create('Ilc.scheduler.Training', {
            width: 800,
            height: 400,

            // startDate: new Date(2010, 4, 22, 6),
            eventResizeHandles: 'none',
            enableDragCreation: false,

            resourceStore: resourceStore,
            eventStore: eventStore,

        });

        me.items = [
            trainingScheduler
        ];
        resourceStore.load();
        me.callParent(arguments);
    }
});