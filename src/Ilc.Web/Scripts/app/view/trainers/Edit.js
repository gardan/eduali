Ext.define('Ilc.view.trainers.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'edittrainerwindow',

    title: Ilc.resources.Manager.getResourceString('common.trainer'),

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    layout: 'anchor',
    width: 600,
    bodyPadding: 0,

    subjectsStore: null,
    model: null,

    trainerEdited: function () {
        this.avatarUploader.initUpload();
    },

    loadSubjects: function () {
        this.subjectsStore.load({
            params: {
                trainerId: this.model.id
            }
        });
    },

    subjectDeleted: function() {
        this.loadSubjects();
    },

    onUploadComplete: function() {
        this.fireEvent('traineredited');
        this.close();
    },

    initUploader: function () {
        var me = this;

        var userId = me.model.userInfo.id;
        var avatarUrl = 'api/users/' + userId + '/avatar';
        var avatarUploader = Ext.create('Ilc.uploader.Avatar', {
            avatarUrl: avatarUrl,
            uploadUrl: avatarUrl, // Method: PUT
            fieldLabel: 'Avatar',
            listeners: {
                'uploadcomplete': me.onUploadComplete,

                scope: me
            }
        });

        return avatarUploader;
    },

    initComponent: function (config) {
        var me = this;

        var cfgModel = me.model;

        var subjectsStore = Ext.create('Ilc.store.Subjects');
        this.subjectsStore = subjectsStore;

        var subjectsGrid = Ext.create('Ext.grid.Panel', {
            store: subjectsStore,
            columns: [
                {
                    dataIndex: 'name',
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/remove.png',
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                var model = {
                                    trainerId: me.model.id,
                                    subjectId: record.get('id')
                                };

                                me.fireEvent('deletesubjectfromtrainer', me, model);
                            }
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Add subjects',
                            handler: function () {
                                var unassignedSubjectsStore = Ext.create('Ilc.store.Subjects');
                                
                                unassignedSubjectsStore.load({
                                    params: {
                                        assigned: false,
                                        trainerId: cfgModel.id
                                    }
                                });

                                var window = Ext.create('Ext.window.Window', {
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            editable: false,
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'name',
                                            multiSelect: true,
                                            store: unassignedSubjectsStore,
                                            name: 'subjects'
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: Ilc.resources.Manager.getResourceString('common.add'),
                                            handler: function() {
                                                var model = {};
                                                var inputs = window.query('textfield');
                                                model = Ilc.utils.Forms.extractModel(inputs);
                                                model.trainerId = cfgModel.id;

                                                me.fireEvent('addsubjectstotrainer', window, model, {
                                                    parent: me
                                                });
                                            }
                                        },
                                        {
                                            text: Ilc.resources.Manager.getResourceString('common.cancel'),
                                            handler: function () {
                                                window.close();
                                            }
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

        me.avatarUploader = me.initUploader();

        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        xtype: 'container',
                        title: 'General',
                        defaults: {
                            xtype: 'textfield',
                            anchor: '100%'
                        },
                        padding: 10,
                        layout: 'anchor',
                        items: [
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                                name: 'userInfo.firstName',
                                value: cfgModel.userInfo.firstName
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                                name: 'userInfo.lastName',
                                value: cfgModel.userInfo.lastName
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                                name: 'userInfo.email',
                                value: cfgModel.userInfo.email
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                                name: 'userInfo.phone',
                                value: cfgModel.userInfo.phone
                            },
                            me.avatarUploader
                        ]
                    },
                    {
                        xtype: 'container',
                        title: 'Subjects',
                        defaults: {
                            xtype: 'textfield',
                            anchor: '100%'
                        },
                        layout: 'anchor',
                        items: [
                            subjectsGrid
                        ]
                    }
                ]
            }

        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function (button, e) {
                    var model = {};
                    var inputs = me.query('textfield');
                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = cfgModel.id;

                    me.fireEvent('editTrainer', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'editTrainer',
            'addsubjectstotrainer',
            'deletesubjectfromtrainer',
            'traineredited'
        );

        // subjectsStore.load({
        //     params: {
        //         trainerId: cfgModel.id
        //     }
        // });
        me.loadSubjects();

        me.callParent(arguments);
    }
});