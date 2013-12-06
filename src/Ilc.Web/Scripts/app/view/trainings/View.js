Ext.define('Ilc.view.trainings.View', {
    extend: 'Ext.window.Window',
    xtype: 'viewtrainingwindow',

    title: 'Trainings details',
    requires: [
        'Ext.util.Point',
        'Ilc.view.trainings.view.Planning',
        'Ilc.view.spendings.View'
    ],
    width: 900,

    defaults: {
        xtype: 'panel'
    },

    layout: 'anchor',
    bodyPadding: 0,
    model: null,

    trainingUpdated: function () {
        this.fireEvent('trainingupdated');
    },

    initComponent: function (cfg) {
        var me = this;
        var model = me.model;

        var studentsStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'phone'],
            data: model.get('students')
        });

        var documentsTreeStore = Ext.create('Ext.data.TreeStore', {
            fields: ['expanded', 'children', 'text', 'category', 'leaf'],
            root: {
                expanded: true,
                children: [
                    {
                        text: 'Offer',
                        category: 'offers',
                        leaf: true
                    },
                    {
                        text: 'Intakes',
                        category: 'intakes',
                        leaf: true
                    },
                    {
                        text: 'Lessons evaluations',
                        category: 'lessonEval',
                        leaf: true
                    },
                    {
                        text: 'Exams',
                        category: 'exams',
                        leaf: true
                    },
                    {
                        text: 'Evaluations',
                        category: 'evaluations',
                        leaf: true
                    }
                ]
            }
        });

        var documentsStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'url', 'creator', 'createDate'],
            
            proxy: {
                type: 'rest',
                url: 'api/files',
                extraParams: {
                    format: 'json'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                }
            }
        });

        var documentsTree = Ext.create('Ext.tree.Panel', {
            store: documentsTreeStore,
            rootVisible: false,
            columnWidth: 0.40
        });
        var documentsPanel = Ext.create('Ext.grid.Panel', {
            columnWidth: 0.60,
            store: documentsStore,
            border: false,
            header: false,
            hideHeaders: false,
            columns: [
                {
                    dataIndex: 'name',
                    flex: 1,
                    text: Ilc.resources.Manager.getResourceString('common.file'),
                    renderer: function (value, metaData, record) {
                        return '<a href="' +
                            record.get('url') +
                            '" target="_blank">' +
                            value + 
                            '</a>';
                    }

                },
                {
                    dataIndex: 'creator',
                    text: Ilc.resources.Manager.getResourceString('common.creator'),
                    flex: 1,
                    renderer: function (value, metaData, record) {
                        return value.name;
                    }
                },
                {
                    dataIndex: 'createDate',
                    flex: 1,
                    text: Ilc.resources.Manager.getResourceString('common.createAt'),
                    renderer: function (value) {
                        return moment(value).format(Ilc.resources.Manager.getResourceString('formats.date'));
                    }
                }
            ]
        });

        // General
        var trainersStore = Ext.create('Ilc.store.Trainers');
        
        var salesUsersStore = Ext.create('Ilc.store.Users', {
            claims: 'tasks-sales'
        });
        var coordinatorsUsersStore = Ext.create('Ilc.store.Users', {
            claims: 'tasks-coordinator'
        });
        var administratorsUsersStore = Ext.create('Ilc.store.Users', {
            claims: 'tasks-administrator'
        });

        var trainersComboBox = Ext.create('Ext.form.ComboBox', {
            store: trainersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'trainerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.trainer'),
            anchor: '100%',
            margin: '5 5 5 5',
            labelWidth: 150
        });

        trainersStore.on('load', function (store, records) {
            Ext.Array.forEach(records, function (record) {
                if (record.get('id') == model.get('trainer').id) {
                    trainersComboBox.select(record);
                }
            });
            
        });

        trainersStore.load({
            params: {
                subjectId: model.get('subject').id
            }
        });

        // Select the first item
        var viewReady = function (tree) {
            var rootNode = tree.getRootNode();

            rootNode.eachChild(function (record) {
                if (record.isFirst()) {
                    tree.getSelectionModel().select(record);
                }
            });
        };
        documentsTree.on('viewready', viewReady);

        documentsTree.on('select', function (row, record) {
            documentsStore.removeAll();
            switch (record.get('category')) {
                case 'offers':
                    documentsStore.load({
                        params: {
                            trainingId: model.get('id'),
                            category: 'offer'
                        }
                    });
                    break;
                case 'intakes':
                    documentsStore.add({
                        name: 'Gheorghe Ion',
                        url: 'http://localhost:54877/pdf/intakes/1',
                        creator: { id: 1, name: 'admin' },
                        createDate: '2013-12-12T12:34:45'
                    });
                    break;
                case 'lessonEval':
                    documentsStore.add({
                        name: 'Gheorghe Ion',
                        url: 'http://localhost:54877/pdf/lessonEvaluations/1',
                        creator: { id: 1, name: 'admin' },
                        createDate: '2013-12-12T12:34:45'
                    });
                    break;
                case 'exams': 
                    documentsStore.add({
                        name: 'Gheorghe Ion',
                        url: 'http://localhost:54877/pdf/exams/1',
                        creator: { id: 1, name: 'admin' },
                        createDate: '2013-12-12T12:34:45'
                    });
                    break;
                case 'evaluations':
                    documentsStore.add({
                        name: 'Gheorghe Ion',
                        url: 'http://localhost:54877/pdf/evaluations/1',
                        creator: { id: 1, name: 'admin' },
                        createDate: '2013-12-12T12:34:45'
                    });
                    break;
            default:
            }
            
        });

        documentsTree.on('itemcontextmenu', function (view, record, node, index, event) {
            console.log('fired');
            var menu = Ext.create('Ext.menu.Menu', {
                items: [
                    {
                        text: 'zip',
                        handler: function () {
                            var path = 'zip/' + record.get('category') + '?trainingId=' + model.get('id');
                            window.open(path);
                        }
                    }
                ]
            });

            menu.showAt(event.getXY());
            event.stopEvent();
        });

        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        xtype: 'panel',
                        title: 'General',
                        defaults: {
                            bodyPadding: 10,
                            margin: 5,
                            labelWidth: 150
                        },
                        listeners: {
                            render: function (panel) {
                                salesUsersStore.load({
                                    callback: function () {
                                        // We need to set the id == me.model.get('id')
                                        panel.items.items[1].setValue(me.model.get('ownersConfiguration').sales);
                                    }
                                });
                                
                                administratorsUsersStore.load({
                                    callback: function () {
                                        // We need to set the id == me.model.get('id')
                                        panel.items.items[2].setValue(me.model.get('ownersConfiguration').administration);
                                    }
                                });
                                
                                coordinatorsUsersStore.load({
                                    callback: function () {
                                        // We need to set the id == me.model.get('id')
                                        panel.items.items[3].setValue(me.model.get('ownersConfiguration').coordinator);
                                    }
                                });
                            }
                        },
                        items: [
                            trainersComboBox,
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Sales user',
                                store: salesUsersStore,
                                displayField: 'username',
                                valueField: 'id',
                                name: 'workflowOwners.sales',
                                margin: '0 5 5 5'
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Administration user',
                                store: administratorsUsersStore,
                                displayField: 'username',
                                valueField: 'id',
                                name: 'workflowOwners.administration',
                                margin: '0 5 5 5'
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Coordination user',
                                store: coordinatorsUsersStore,
                                displayField: 'username',
                                valueField: 'id',
                                name: 'workflowOwners.coordinator',
                                margin: '0 5 5 5'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.startDate'),
                                value: new Date(model.get('desiredStartDate'))
                            }
                        ],
                        buttons: [
                            {
                                text: Ilc.resources.Manager.getResourceString('common.update'),
                                handler: function (btn) {
                                    var controls = btn.up().up().items.items.slice(0, 4);
                                    
                                    var args = Ilc.utils.Forms.extractModel(controls);
                                    args.id = model.get('id');

                                    me.mask();
                                    me.fireEvent('updatetraining', me, args);
                                }
                            },
                            {
                                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                                handler: function() {
                                    me.close();
                                }
                            }
                        ]

                    },
                    {
                        xtype: 'planningTab',
                        entity: model,
                        width: 900
                    },
                    {
                        title: 'Students',
                        items: [
                            {
                                xtype: 'grid',
                                store: studentsStore,
                                bodyPadding: 0,
                                columns: [
                                    {
                                        dataIndex: 'name',
                                        text: 'Name',
                                        flex: 1
                                    },
                                    {
                                        dataIndex: 'phone',
                                        text: 'Phone',
                                        flex: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: 'Documents',
                        layout: 'column',
                        items: [
                            documentsTree,
                            documentsPanel
                        ]
                    },
                    Ext.create('Ilc.view.trainings.view.InterviewPlan', {
                        title: 'Interview',
                        training: model,
                        plan: Ext.create('Ilc.model.InterviewPlan', {
                            date: model.get('interviewPlan').date,
                            location: model.get('interviewPlan').location
                        }),
                        listeners: {
                            updatetraining: function(sender, args) {
                                me.fireEvent('updatetraining', sender, args);
                            },
                            closewindow: function() {
                                me.close();
                            }
                        }
                    }),
                    {
                        xtype: 'spendingsview',
                        title: 'Expenses',
                        spendings: model.get('spendings'),
                        hours: model.get('hours'),
                        listeners: {
                            cancelclicked: function () {
                                me.close();
                            }
                        } 
                    }
                ]
            }

        ];

        me.addEvents(
            'updatetraining',
            'trainingupdated'
        );

        me.callParent(arguments);
    }
});