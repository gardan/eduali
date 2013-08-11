Ext.define('Ilc.view.trainings.View', {
    extend: 'Ext.window.Window',

    title: 'Trainings details',
    requires: [
        'Ext.util.Point'
    ],
    width: 400,

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
            data: model.students
        });

        var documentsTreeStore = Ext.create('Ext.data.TreeStore', {
            fields: ['expanded', 'children', 'text', 'category', 'leaf'],
            root: {
                expanded: true,
                children: [
                    {
                        text: 'Offer',
                        category: 'offer',
                        leaf: true
                    },
                    {
                        text: 'Intakes',
                        category: 'intakes',
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
            fields: ['name', 'url']
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
            hideHeaders: true,
            columns: [
                {
                    dataIndex: 'name',
                    flex: 1,
                    renderer: function (value, metaData, record) {
                        return '<a href="' +
                            record.get('url') +
                            '" target="_blank">' +
                            value + 
                            '</a>';
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
                case 'offer':
                    documentsStore.add({
                        name: 'Offer',
                        url: 'http://localhost:54877/pdf/offers/1'
                    });
                    break;
                case 'intakes':
                    documentsStore.add({
                        name: 'Gheorghe Ion',
                        url: 'http://localhost:54877/pdf/intakes/1'
                    });
                    break;
                case 'exams': 
                    documentsStore.add({
                        name: 'Gheorghe Ion',
                        url: 'http://localhost:54877/pdf/exams/1'
                    });
                    break;
                case 'evaluations':
                    documentsStore.add({
                        name: 'Gheorghe Ion',
                        url: 'http://localhost:54877/pdf/evaluations/1'
                    });
                    break;
            default:
            }
            
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
                                html: model.trainer.name,
                                anchor: '100%'
                            },
                            {
                                title: 'Start',
                                html: model.desiredStartDate,
                                anchor: '100%'
                            },
                            {
                                title: 'End',
                                html: model.desiredEndDate,
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