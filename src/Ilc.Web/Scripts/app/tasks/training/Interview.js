Ext.define('Ilc.tasks.training.Interview', {
    extend: 'Ext.window.Window',
    xtype: 'interviewwindow',
    width: 600,

    constructor: function() {
        var me = this;

        var studentsStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'interviewId'],
            data: {
                data: [
                    { name: 'Ion Ionel', interviewId: 1 },
                    { name: 'Parvan Vasile', interviewId: 2 },
                    { name: 'The Pro', interviewId: 0 }
                ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });


        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Student name'
                },
                {
                    xtype: 'actioncolumn',
                    items: [
                        {
                            getClass: function (v, meta, record) {
                                return record.get('interviewId') == 0 ? 'add-col' : 'view-col';
                            },
                            getTip: function (v, meta, record) {
                                return record.get('interviewId') == 0 ? 'Add interview' : 'View interview';
                            },
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                var action = (record.get('interviewId') == 0 ? "Add" : "View");

                                var store = Ext.create('Ext.data.Store', {
                                    fields: ['text', 'order'],
                                    data: {
                                        data: [
                                            { text: 'A1', order: 1 },
                                            { text: 'A2', order: 2 },
                                            { text: 'B1', order: 3 },
                                            { text: 'B2', order: 4 },
                                            { text: 'C1', order: 5 },
                                            { text: 'C2', order: 6 }
                                        ]
                                    },
                                    proxy: {
                                        type: 'memory',
                                        reader: {
                                            type: 'json',
                                            root: 'data'
                                        }
                                    }
                                });
                                
                                var trainersStore = Ext.create('Ext.data.Store', {
                                    fields: ['name'],
                                    data: {
                                        data: [
                                            { id: 1, name: 'Trainer 1' },
                                            { id: 2, name: 'Trainer Z' },
                                            { id: 3, name: 'Professor X' }
                                        ]
                                    },
                                    proxy: {
                                        type: 'memory',
                                        reader: {
                                            type: 'json',
                                            root: 'data'
                                        }
                                    }
                                });

                                var window = Ext.create('Ext.window.Window', {
                                    modal: true,
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            store: store,
                                            fieldLabel: 'Level',
                                            queryMode: 'local',
                                            displayField: 'text',
                                            valueField: 'order'
                                        },
                                        {
                                            xtype: 'combobox',
                                            store: store,
                                            fieldLabel: 'Target level',
                                            queryMode: 'local',
                                            displayField: 'text',
                                            valueField: 'order'
                                        },
                                        {
                                            xtype: 'combobox',
                                            store: trainersStore,
                                            fieldLabel: 'Trainer',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'order'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Add'
                                        }
                                    ]
                                });
                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        me.items = [
            studentsGrid,
            {
                xtype: 'button',
                text: 'Done'
            }
        ];

        me.callParent(arguments);
    }
});