Ext.define('Ilc.view.students.List', {
    extend: 'Ext.container.Container',
    xtype: 'liststudents',

    constructor: function () {
        var me = this;

        var studentsStore = Ext.create('Ilc.store.Students');

        var filters = {
            ftype: 'jsvfilters',
            local: false,
        };

        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            features: [filters],
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'customer',
                    text: 'Customer',
                    flex: 1,
                    renderer: function (value) {
                        return value.name;
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/edit.png',
                            scope: me,
                            tooltip: 'Edit',
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                var editWindow = Ext.create('Ilc.view.students.Edit', {
                                    closeAction: 'destroy',
                                    model: record.data
                                });

                                editWindow.on('editStudent', function (sender, model) {
                                    me.fireEvent('editStudent', sender, model, {
                                        store: studentsStore
                                    });
                                });

                                editWindow.show();
                            }
                        },
                        {
                            icon: 'images/web/remove.png',
                            scope: me,
                            tooltip: 'Delete',
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                me.fireEvent('deleteStudent', me, {
                                    id: record.data.id
                                }, {
                                    store: studentsStore
                                });
                            }
                        }
                    ]
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

        me.addEvents(
            'addStudent',
            'editStudent',
            'deleteStudent'
        );

        me.callParent(arguments);
    }
});