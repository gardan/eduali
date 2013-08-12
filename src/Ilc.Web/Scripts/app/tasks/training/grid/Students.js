Ext.define('Ilc.tasks.training.grid.Students', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ilc.utils.Forms'
    ],
    
    constructor: function () {
        var me = this;

        me.columns = [
            {
                dataIndex: 'name',
                text: 'Student name',
                flex: 1
            },
            {
                xtype: 'actioncolumn',
                items: [
                    {
                        getClass: function(v, meta, record) {
                            return record.get('interviewId') == 0 ? 'add-col' : 'view-col';
                        },
                        getTip: function(v, meta, record) {
                            return record.get('interviewId') == 0 ? 'Add interview' : 'View interview';
                        },
                        handler: function(grid, rowIndex, colIndex, item, e, record) {
                            var action = (record.get('interviewId') == 0 ? "Add" : "View");

                            var store = Ext.create('Ext.data.Store', {
                                fields: ['text', 'order'],
                                data: {
                                    data: [
                                        { id: 1, text: 'A1', order: 1 },
                                        { id: 2, text: 'A2', order: 2 },
                                        { id: 3, text: 'B1', order: 3 },
                                        { id: 4, text: 'B2', order: 4 },
                                        { id: 5, text: 'C1', order: 5 },
                                        { id: 6, text: 'C2', order: 6 }
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
                                fields: ['id', 'name'],
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
                                        valueField: 'id',
                                        name: 'listening.currentLevel'
                                    },
                                    {
                                        xtype: 'combobox',
                                        store: store,
                                        fieldLabel: 'Target level',
                                        queryMode: 'local',
                                        displayField: 'text',
                                        valueField: 'id',
                                        name: 'listening.desiredLevel'
                                    },
                                    //{
                                    //    xtype: 'combobox',
                                    //    store: trainersStore,
                                    //    fieldLabel: 'Trainer',
                                    //    queryMode: 'local',
                                    //    displayField: 'name',
                                    //    valueField: 'order'
                                    //},
                                    {
                                        xtype: 'button',
                                        text: 'Add',
                                        handler: function (btn, events) {
                                            var model = {};
                                            // example: 
                                            // {
                                            //     listening: { currentLevel: 1, desiredLevel: 4 },
                                            //     reading: { currentLevel: 1, desiredLevel: 4 },
                                            //     productiveSpeaking: { currentLevel: 1, desiredLevel: 4 },
                                            //     writing: { currentLevel: 1, desiredLevel: 4 }
                                            // };

                                            model = Ilc.utils.Forms.extractModel(window.query('textfield'));
                                            me.fireEvent('addInterview', window, model);
                                        }
                                    }
                                ]
                            });
                            window.show();
                        }
                    }
                ]
            }
        ];

        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});