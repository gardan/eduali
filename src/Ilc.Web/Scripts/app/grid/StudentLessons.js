Ext.define('Ilc.grid.StudentLessons', {
    extend: 'Ext.grid.Panel',
    
    student: null,
    trainingId: null,

    minWidth: 800,
    width: 800,

    validateConfig: function() {
        var me = this;

        if (me.student == null) {
            console.error('student was not supplied');
        }
        if (me.trainingId == null) {
            console.error('trainingId was not supplied');
        }
    },

    viewConfig: {
        getRowClass: function (record) {
            var complete = record.get('progressEvaluationComplete');
            return complete != true ? 'grid-row-pending' : 'grid-row-complete';
        }
    },
    columns: [
        { dataIndex: 'Name', text: Ilc.resources.Manager.getResourceString('common.name'), flex: 1 }
    ],

    initComponent: function() {
        var me = this;
        me.validateConfig();

        var lessonsStore = Ext.create('Ilc.store.Lessons', {
            trainingId: me.trainingId
        });

        me.store = lessonsStore;

        me.store.load();

        me.callParent(arguments);
    }
});