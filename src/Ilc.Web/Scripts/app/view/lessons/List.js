Ext.define('Ilc.view.lessons.List', {
    extend: 'Ext.container.Container',
    
    training: null,

    onLessonGridSelect: function(grid, record, index, eOpts) {
        this.fireEvent('selected', this, record);
    },

    initComponent: function() {
        var me = this;

        var lessonsStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: me.training.get('id'),
            overlay: false
        });

        var lessonsGrid = Ext.create('Ext.grid.Panel', {
            store: lessonsStore,
            columns: [
                {
                    dataIndex: 'Name',
                    text: 'Name',
                    flex: 1
                }
            ],
            listeners: {
                select: me.onLessonGridSelect,
                scope: me
            }
        });

        me.items = [
            lessonsGrid
        ];

        lessonsStore.load();
        me.addEvents(
            'selected'
        );
        me.callParent(arguments);
    }
});