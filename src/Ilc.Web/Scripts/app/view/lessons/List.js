Ext.define('Ilc.view.lessons.List', {
    extend: 'Ext.container.Container',
    xtype: 'lessonslist',

    training: null,

    lessonsStore: null,
    lessonsGrid: null,

    onLessonGridSelect: function(grid, record) {
        this.fireEvent('selected', this, record);
    },

    updateFinished: function (lessonRecord) {
        var rec = this.lessonsStore.getById(lessonRecord.id);
        rec.commit();
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

                    var model = {
                        id: rec.get('Id'),
                        trainingId: me.training.get('id'),
                        startDate: rec.get('StartDate'),
                        endDate: rec.get('EndDate'),
                        lessonName: rec.get('Name'),
                    };

                    me.fireEvent('editlesson', me, model);
                }
            }
        });

        var textField = {
            xtype: 'textfield'   
        };

        me.lessonsGrid = Ext.create('Ext.grid.Panel', {
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
            me.lessonsGrid
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