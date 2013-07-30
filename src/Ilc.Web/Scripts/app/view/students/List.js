Ext.define('Ilc.view.students.List', {
    extend: 'Ext.container.Container',
    

    constructor: function () {
        var me = this;

        var studentsStore = Ext.create('Ilc.store.Students');

        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1
                },
                {
                    dataIndex: 'customer',
                    text: 'Customer',
                    flex: 1,
                    renderer: function (value) {
                        return value.name;
                    }
                }
            ]
        });

        me.items = [
            {
                xtype: 'button',
                text: 'New student',
            },
            studentsGrid
        ];

        me.callParent(arguments);
    }
});