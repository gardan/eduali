Ext.define('Ilc.view.lessons.List', {
    extend: 'Ext.container.Container',
    
    training: null,

    lessonsStore: null,

    onLessonGridSelect: function(grid, record) {
        this.fireEvent('selected', this, record);
    },

    initComponent: function() {
        var me = this;

        me.lessonsStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: me.training.get('id'),
            overlay: false
        });
        
        var lessonsGrid = Ext.create('Ext.grid.Panel', {
            store: me.lessonsStore,
            columns: [
                {
                    dataIndex: 'Name',
                    text: 'Name',
                    flex: 1
                }
            ],
            listeners: {
                itemclick: me.onLessonGridSelect,
                scope: me
            }
        });
        
        me.items = [
            lessonsGrid
        ];
        
        me.lessonsStore.load();
        me.addEvents(
            'selected'
        );
        me.callParent(arguments);
    }
});