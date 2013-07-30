Ext.define('Ilc.view.students.List', {
    extend: 'Ext.container.Container',
    xtype: 'liststudents',

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
                handler: function () {
                    var window = Ext.create('Ilc.view.students.Create', {
                        closeAction: 'destroy'
                    });

                    window.on('addStudent', function (sender, model) {
                        me.fireEvent('addStudent', sender, model, {
                             store: studentsStore
                        });
                    });

                    window.show();
                }
            },
            studentsGrid
        ];

        me.addEvents('addStudent');

        me.callParent(arguments);
    }
});