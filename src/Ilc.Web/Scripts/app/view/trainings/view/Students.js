Ext.define('Ilc.view.trainings.view.Students', {
    extend: 'Ext.container.Container',

    xtype: 'addstudenttotraining',
    requires: [
        'Ilc.helpers.ColumnBuilder'
    ],

    initColumns: function () {
        debugger
        var me = this;
        debugger
        var ret = [

            {
                dataIndex: 'name', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                text: Ilc.resources.Manager.getResourceString('common.name'),
                flex: 1,
                renderer: function (value, meta, record) {
                    return record.get('userInfo').firstName;
                },
                filter: {
                    type: 'string'
                },

            },
        ];
    },

    initComponent: function () {
        debugger
        var me = this;

        var studentsStore = Ext.create('Ilc.store.Students');

        me.studentsStore = studentsStore;

        var filters = {
            ftype: 'jsvfilters',
            local: false,
        };

        var columns = me.initColumns();

        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            features: [filters],
            columns: columns
        });

        me.items = [
            studentsGrid
        ];
        me.callParent(arguments);
    }
});