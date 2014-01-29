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
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: studentsStore,
                    dock: 'bottom'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-add',
                            text: Ilc.resources.Manager.getResourceString('common.newStudent'),
                            handler: function () {
                                var window = Ext.create('Ilc.view.students.Create', {
                                    closeAction: 'destroy'
                                });

                                window.on('addStudent', function (sender, model) {
                                    me.fireEvent('addStudent', sender, model, {
                                        store: studentsStore
                                    });
                                });

                                window.on('studentadded', function() {
                                    studentsStore.reload();
                                });

                                window.show();
                            }
                        }]
                }
            ],
            columns: [
                {
                    // TODO: should actually use 'templatecolumn' and a XTemplate to create the <img /> tag.
                    dataIndex: 'name',
                    text: Ilc.resources.Manager.getResourceString('common.avatar'),
                    renderer: function (value, meta, record) {
                        var avatarUrl = record.get('userInfo').avatarLocation;
                        return '<img width="64" height="64" src="' + avatarUrl + '" />';
                    }
                },
                {
                    dataIndex: 'name', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    flex: 1,
                    renderer: function(value, meta, record) {
                        return record.get('userInfo').name;
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'customer',
                    text: Ilc.resources.Manager.getResourceString('common.customer'),
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
                            icon: 'images/web/remove.png',
                            scope: me,
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
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

        studentsGrid.on('itemdblclick', function (grid, record) {
            var editWindow = Ext.create('Ilc.view.students.Edit', {
                closeAction: 'destroy',
                model: record
            });

            editWindow.on('editStudent', function (sender, model) {
                me.fireEvent('editStudent', sender, model, {
                    store: studentsStore
                });   
            });

            editWindow.on('studentedited', function() {
                studentsStore.reload();
            });

            editWindow.show();
        });

        me.items = [
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