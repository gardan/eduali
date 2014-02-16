Ext.define('Ilc.view.lessons.List', {
    extend: 'Ext.container.Container',
    xtype: 'lessonslist',

    training: null,

    lessonsStore: null,

    onLessonGridSelect: function(grid, record) {
        this.fireEvent('selected', this, record);
    },

    updateFinished: function(lessonRecord) {
        lessonRecord.commit();
        this.fireEvent('aftereditlesson', this, lessonRecord);
    },

    initComponent: function() {
        var me = this;

        me.lessonsStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: me.training.get('id'),
            overlay: false
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clickstoedit: 2,
            autoCancel: false,
            listeners: {
                edit: function (editor, e) {
                    var rec = e.record;
                    me.fireEvent('editlesson', me, rec, {
                        trainingId: me.training.get('id')
                    });
                }
            }
        });

        var textField = {
            xtype: 'textfield'   
        };

        var lessonsGrid = Ext.create('Ext.grid.Panel', {
            plugins: [ rowEditing ],
            store: me.lessonsStore,
            columns: [
                {
                    dataIndex: 'Name',
                    text: 'Name',
                    flex: 1,
                    editor: textField
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
            'selected',
            'editlesson',
            'aftereditlesson'
        );
        me.callParent(arguments);
    }
});