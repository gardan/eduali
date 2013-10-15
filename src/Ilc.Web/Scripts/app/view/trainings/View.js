﻿Ext.define('Ilc.view.trainings.View', {
    extend: 'Ext.window.Window',

    title: 'Trainings details',
    requires: [
        'Ext.util.Point',
        'Ilc.view.trainings.view.Planning'
    ],
    width: 800,

    defaults: {
        xtype: 'panel'
    },

    layout: 'anchor',
    bodyPadding: 0,
    constructor: function (cfg) {
        var me = this;
        var model = cfg.model;

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
        
        var trainersComboBox = Ext.create('Ext.form.ComboBox', {
            store: trainersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'trainerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.trainer'),
            anchor: '100%',
            margin: 5,
        });

        trainersStore.on('load', function (store, records) {
            Ext.Array.forEach(records, function(record) {
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
                            margin: 5
                        },
                        items: [
                            trainersComboBox,
                            {
                                xtype: 'datefield',
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.startDate'),
                                value: new Date(model.get('desiredStartDate'))
                            }
                        ],
                        buttons: [
                            {
                                text: Ilc.resources.Manager.getResourceString('common.update'),
                                handler: function () {
                                    var args = {
                                        id: model.get('id'),
                                        trainerId: 2
                                    };

                                    me.mask();
                                    me.fireEvent('updatetraining', me, args);
                                }
                            }
                        ]

                    },
                    {
                        xtype: 'planningTab',
                        entity: model
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
                            }
                        }
                    })
                ]
            }

        ];

        me.addEvents(
            'updatetraining'
        );

        me.callParent(arguments);
    }
});