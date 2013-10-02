Ext.define('Ilc.view.trainings.View', {
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
                            bodyPadding: 10
                        },
                        items: [
                            {
                                title: 'Trainer',
                                html: model.get('trainer').name,
                                anchor: '100%'
                            },
                            {
                                title: 'Start',
                                html: moment(model.get('desiredStartDate')).format(Ilc.resources.Manager.getResourceString('formats.date')),
                                anchor: '100%'
                            },
                            {
                                title: 'End',
                                html: moment(model.get('desiredEndDate')).format(Ilc.resources.Manager.getResourceString('formats.date')),
                                anchor: '100%'
                            },
                            {
                                xtype: 'grid',
                                store: studentsStore,
                                title: 'Students',
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
                        xtype: 'planningTab',
                        entity: model
                    },
                    {
                        xtype: 'panel',
                        title: 'Documents',
                        layout: 'column',
                        items: [
                            documentsTree,
                            documentsPanel
                        ]
                    }
                ]
            }

        ];

        me.callParent(arguments);
    }
});