﻿Ext.define('Ilc.view.trainings.View', {
    extend: 'Ext.window.Window',
    xtype: 'viewtrainingwindow',

    title: 'Trainings details',
    requires: [
        'Ext.util.Point',
        'Ilc.view.trainings.view.Planning',
        'Ilc.view.spendings.View',
        'Ilc.view.subjectFiles.List',
        'Ilc.view.gradingAttributes.TrainingList',
        'Ilc.view.trainings.view.Contacts',
        'Ilc.view.trainings.view.Documents',
        'Ilc.view.trainings.view.Expenses',
        'Ilc.view.trainings.view.Students',
        'Ilc.view.stakeholders.List',
        'Ext.ux.form.ColorField',
        'Ext.ux.grid.Printer'

    ],
    width: 900,

    defaults: {
        xtype: 'panel'
    },

    layout: 'anchor',
    bodyPadding: 0,
    model: null,

    trainingUpdated: function (training) {
        this.fireEvent('trainingupdated');
        var tab = this.query('planningTab')[0];
        tab.setEntity(training);
        this.reloadLessonTableStore();
    },

    initComponent: function (cfg) {
        var me = this;
        var model = me.model;
        var initialResizeForDocumentsTab = false;

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
            columnWidth: 0.40,
            minHeight: 100,
            width: 200,
            collapsible: true,
            region: 'west'
        });
        var documentsPanel = Ext.create('Ext.grid.Panel', {
            columnWidth: 0.60,
            region: 'center',
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
        var trainersStore = Ext.create('Ilc.store.Trainers', {
            pageSize: 1000
        });

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

        var contactsStore = Ext.create('Ilc.store.Contacts', {
            customerId: model.get('customer').id
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

        // To Be Deleted // 
        // what is this?
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
                anchor: '100%, 100%',
                listeners: {
                    tabchange: function (tabpanel, newCard, oldCard) {
                        if (newCard.initialConfig.ticktack == true && !initialResizeForDocumentsTab) {
                            me.resizer.resizeTo(me.getWidth(), 300);
                            // window.resize();
                        }
                    }
                },
                items: [
                    {
                        xtype: 'panel',

                        title: 'General',
                        defaults: {
                            bodyPadding: 10,
                            margin: 5,
                            labelWidth: 150
                        },
                        items: me.getGeneralItems(),
                        buttons: [
                            {
                                text: Ilc.resources.Manager.getResourceString('common.update'),
                                handler: function (btn) {
                                    var controls = btn.up().up().items.items;

                                    var args = Ilc.utils.Forms.extractModel(controls);
                                    args.id = model.get('id');
                                    if (args.owners !== 0) {
                                        args.owners = [{ id: args.owners }];
                                    }

                                    me.fireEvent('updatetraining', me, args);
                                }
                            },
                            {
                                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                                handler: function () {
                                    me.close();
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'planningTab',
                        entity: model,
                        width: 900,
                        listeners: {
                            'updatecomplete': this.onLessonUpdated,
                            'lessoncreated': this.onLessonCreated,
                            scope: me
                        }
                    },
                    {
                        title: 'Students',
                        items: [
                            {
                                xtype: 'grid',
                                store: studentsStore,
                                bodyPadding: 0,

                                tbar: {
                                    items: [
                                        {
                                            xtype: 'button',
                                            iconCls: 'icon-add',
                                            cls: 'clean-button',
                                            text: Ilc.resources.Manager.getResourceString('common.addStudent'),
                                            handler: function (btn, e) {
                                                // To Do //
                                                // here add a view to select a sudent ...Ilc.view.trainings.view.Students
                                                var window = Ext.create('Ilc.view.trainings.view.Students', {
                                                    modal: true,
                                                    training: me.model,
                                                    closeAction: 'destroy'
                                                });

                                                window.on('added-students', function (options) {
                                                    studentsStore.loadRawData(options.addedStudents, true);
                                                });
                                                window.show();
                                            }
                                        }
                                    ]
                                },

                                listeners: {
                                    itemdblclick: function (grid, record, item, index, e, eOpts) {
                                        var window = Ext.create('Ext.window.Window', {
                                            title: 'Progress evaluations for ' + record.get('name'),
                                            items: [
                                                Ext.create('Ilc.grid.StudentLessons', {
                                                    student: record,
                                                    trainingId: me.model.get('id'),
                                                    listeners: {
                                                        itemdblclick: function (studentLessonsGrid, lessonRecord) {
                                                            if (lessonRecord.get('progressEvaluationComplete') == false) {
                                                                return;
                                                            }
                                                            var progressEvalWindow = Ext.create('Ilc.tasks.training.window.ViewStudentEvaluation', {
                                                                trainingEntity: me.model,
                                                                lessonEntity: lessonRecord,
                                                                student: record
                                                            });

                                                            progressEvalWindow.show();
                                                        }
                                                    }
                                                })
                                            ]
                                        });

                                        window.show();
                                    }
                                },
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
                    // {
                    //     xtype: 'panel',
                    //     title: 'Documents',
                    //     layout: 'border',
                    //     ticktack: true, // use the initalConfig property to determine if this is the documents component
                    //     items: [
                    //         documentsTree,
                    //         documentsPanel
                    //     ],
                    //     buttons: [
                    //         {
                    //             text: 'Close',
                    //             handler: function() {
                    //                 me.close();
                    //             }
                    //         }
                    //     ]
                    // },

                    // To Be Deleted //
                    //{
                    //    xtype: 'documentspanel',
                    //    title: 'Documents',
                    //    training: model
                    //},

                    // To Be Deleted //
                    // Not needed anymore, will be part of the training planning. It will be planned as a lesson
                    //Ext.create('Ilc.view.trainings.view.InterviewPlan', {
                    //    title: 'Interview',
                    //    training: model,
                    //    plan: Ext.create('Ilc.model.InterviewPlan', {
                    //        date: model.get('interviewPlan').date,
                    //        location: model.get('interviewPlan').location
                    //    }),
                    //    listeners: {
                    //        updatetraining: function(sender, args) {
                    //            me.fireEvent('updatetraining', sender, args);
                    //        },
                    //        closewindow: function() {
                    //            me.close();
                    //        },
                    //        trainingupdated: function () {
                    //            me.fireEvent('trainingupdated');
                    //        }
                    //    }
                    //}),
                    {
                        title: 'Expenses',
                        xtype: 'trainingexpenses',
                        trainingId: model.get('id')
                    },
                    // To Be Deleted //
                    // The old expense mechanism
                    //{
                    //    xtype: 'spendingsview',
                    //    title: 'Expenses',
                    //    spendings: model.get('spendings'),
                    //    hours: model.get('hours'),
                    //    listeners: {
                    //        cancelclicked: function () {
                    //            me.close();
                    //        },
                    //        editcomplete: function () {
                    //            me.fireEvent('trainingupdated');
                    //        }
                    //    } 
                    //},
                    {
                        title: Ilc.resources.Manager.getResourceString('common.trainingMaterial'),
                        xtype: 'subjectfileslist',
                        subjectId: model.get('subject').id
                    },
                    {
                        title: 'Grading',
                        xtype: 'trainingattributeslist',
                        trainingId: model.get('id'),
                        allowEdit: model.get('statusWeight') < 0.3
                    },
                    {
                        title: 'Contacts',
                        xtype: 'contactstraininglist',
                        text: Ilc.resources.Manager.getResourceString('common.addStudent'),
                        store: contactsStore,
                        trainingId: model.get('id'),
                        customerId: model.get('customer').id
                    },
                    this.getTableSchedule()
//                    {
//                        xtype: 'stakeholderslist',
//                        trainingId: model.get('id')
//                    }
                ]
            }
        ];

        contactsStore.load({
            params: {
                trainingId: model.get('id')
            }
        });

        me.addEvents(
            'updatetraining',
            'trainingupdated'
        );

        me.callParent(arguments);
    },

    _createTable: function (options, extra) {
        var lessonStore = this.lessonsTableStore,
            totalHours = this.model.get('totalHours');;
        return Ext.create('Ext.grid.Panel', Ext.merge({
            title: 'Lessons',
            store: lessonStore,
            columns: [
                {
                    text: Ilc.resources.Manager.getResourceString('common.date'),
                    dataIndex: 'StartDate',
                    flex: 1,
                    renderer: function (value) {
                        return moment(value).format(Ilc.resources.Manager.getResourceString('formats.date'));
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.start'),
                    dataIndex: 'StartDate',
                    flex: 1,
                    renderer: function (value) {
                        return moment(value).format('h:mm');
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.end'),
                    dataIndex: 'EndDate',
                    flex: 1,
                    renderer: function (value, meta, model) {
                        return moment(value).format('h:mm');
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.hours'),
                    dataIndex: 'StartDate',
                    flex: 1,
                    renderer: function (value, meta, model) {
                        return moment(model.get('EndDate')).diff(moment(model.get('StartDate')), 'hours');
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.remainingHours'),
                    dataIndex: 'Id',
                    flex: 1,
                    renderer: function (value, meta, model) {
                        totalHours -= moment(model.get('EndDate')).diff(moment(model.get('StartDate')), 'hours');
                        return totalHours;
                    }
                }
            ],
        }, options));
    },

    _getLessonsHeaderTpl: function () {
        return new Ext.XTemplate(
                '<div class="Lessons-Head--print">' +
                    '<div class="pull-left">' +
                        '<div>Subject: </div>' +
                        '<div>Trainer: </div>' +
                        '<div>Total hours: </div>' +
                    '</div>' +
                    '<div class="pull-left">' +
                        '<div>{subject}</div>' +
                        '<div>{trainer.name}</div>' +
                        '<div>{totalHours}</div>' +
                    '</div>' +
                '</div><div class="clearfix"></div>'
            );
    },

    getTableSchedule: function () {
        var me = this,
            totalHours = this.model.get('totalHours'),
            trainer = R.find(function (stakeholder) {
                return R.any(R.propEq('name', 'Trainer'), stakeholder.roles || []);
            }, this.model.get('stakeHolders') || []),
            subject = this.model.get('subject').name,
            trainerModel = {
                name: trainer ? trainer.fullName : 'No trainer'
            };

        var lessonStore = Ext.create('Ilc.store.scheduler.LessonAppointments', {
            trainingId: this.model.get('id')
        });
        this.lessonsTableStore = lessonStore;
        var table = this._createTable({
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: lessonStore,
                dock: 'bottom',
                displayInfo: true,
                displayMsg: 'Displaying lessons {0} - {1} of {2}'
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: Ilc.resources.Manager.getResourceString('common.print'),
                        handler: function () {
                            Ext.ux.grid.Printer.print(
                                me._createTable({ title: undefined }),
                                {
                                    beforeHtml: me._getLessonsHeaderTpl().apply({
                                        subject: subject,
                                        trainer: trainerModel,
                                        totalHours: totalHours
                                    })
                                }
                            );
                        }
                    }
                ]
            }],
        });
        lessonStore.load({
            params: {
                overlay: false
            }
        });
        return table;
    },

    getGeneralItemsForOwner: function () {
        var me = this;
        var statusStore = Ext.create('Ilc.store.StatusDefinitions'),
            stakeholdersStore = Ext.create('Ilc.store.Users'),
            statusCombo = Ext.create('Ext.form.field.ComboBox', {
                xtype: 'combobox',
                store: statusStore,
                displayField: 'name',
                valueField: 'id',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.status'),
                // anchor: '100%',
                name: 'statusId',
                queryMode: 'local',
                labelWidth: 100
            }),
            initialLoadHandler = function (store, records) {
                Ext.Array.forEach(records, function (record) {
                    if (me.model.get('status').id === record.get('id')) {
                        statusCombo.select(record);
                    }
                });
                statusStore.un('load', initialLoadHandler);
            };


        statusStore.on('load', initialLoadHandler);
        statusStore.load();

        stakeholdersStore.loadRawData(me.model.get('stakeHolders'));
        var ownersCombo = Ext.create('Ext.form.field.ComboBox', {
            xtype: 'combobox',
            // multiSelect: true,
            store: stakeholdersStore,
            displayField: 'fullName',
            valueField: 'id',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.owners'),
            //anchor: '100%',
            name: 'owners',
            queryMode: 'local',
            labelSeparator: "",
            labelWidth: 100
        });

        var selectedRecords = stakeholdersStore.queryBy(function (user) {
            var foundUser = R.find(function (owner) {
                return owner.id === user.get('id');
            }, me.model.get('owners'));
            if (foundUser === undefined) return false;
            return true;
        });

        ownersCombo.select(selectedRecords.items);

        return [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.trainingId'),
                name: 'trainingId',
                value: this.model.get('trainingId'),
                labelWidth: 100
            },{
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.location'),
                name: 'location',
                value: this.model.get('location'),
                labelWidth: 100
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.startDate'),
                value: new Date(this.model.get('desiredStartDate')),
                format: 'd-m-Y',
                name: 'desiredStartDate',
                labelWidth: 100
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.endDate'),
                value: new Date(this.model.get('desiredEndDate')),
                format: 'd-m-Y',
                name: 'desiredEndDate',
                labelWidth: 100
            },
            {
                xtype: 'colorfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.color'),
                value: this.model.get('color').replace('#', ''),
                name: 'color',
                labelWidth: 100
            },
            statusCombo,
            ownersCombo,
            {
                xtype: 'numberfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.totalHours'),
                value: this.model.get('totalHours'),
                name: 'totalHours',
                labelWidth: 100
            }
        ];
    },

    getGeneralItems: function () {
        var currentUserId = Ilc.Configuration.getValue('userId'),
            isAdministrator = Ilc.Configuration.claimExists('tasks-administrator');

        // Can the user edit status or owners?
        if (R.filter(R.propEq('id', currentUserId), this.model.get('owners')).length > 0 || isAdministrator) {
            return this.getGeneralItemsForOwner();
        }

        return [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.trainingId'),
                name: 'trainingId',
                value: this.model.get('trainingId')
            }, {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.location'),
                name: 'location',
                value: this.model.get('location')
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.startDate'),
                value: new Date(this.model.get('desiredStartDate')),
                format: 'd-m-Y',
                name: 'desiredStartDate'
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.endDate'),
                value: new Date(this.model.get('desiredEndDate')),
                format: 'd-m-Y',
                name: 'desiredEndDate'
            },
            {
                xtype: 'textfield',
                disabled: true,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.status'),
                value: this.model.get('status').name
            },
            {
                xtype: 'textfield',
                disabled: true,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.owner'),
                value: R.reduce(function (acc, item) { return acc + item.fullName + ', '; }, '', this.model.get('owners')).slice(0, -2)
            },
            {
                xtype: 'numberfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.totalHours'),
                value: this.model.get('totalHours'),
                name: 'totalHours'
            }
        ];

    },
    onLessonCreated: function () {
        this.reloadLessonTableStore();
    },
    onLessonUpdated: function () {
        this.reloadLessonTableStore();
    },
    reloadLessonTableStore: function () {
        this.lessonsTableStore.reload();
    }
});