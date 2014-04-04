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

    onGenderLoad: function (store, records, successful) {
        var me = this;
        Ext.Array.forEach(records, function (record) {
            if (me.model.userInfo.gender == record.get('id')) {
                me.genderCombo.select(record);
            }
        });
    },

    initGenderCombo: function (store) {
        return Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: Ilc.resources.Manager.getResourceString('common.gender'),
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'userInfo.gender',
            store: store
        });
    },

    initComponent: function (config) {
        var me = this;

        var cfgModel = me.model;

        var subjectsStore = Ext.create('Ilc.store.Subjects');
        this.subjectsStore = subjectsStore;
        var gendersStore = Ext.create('Ilc.store.Genders', {
            listeners: {
                'load': me.onGenderLoad,
                scope: me
            }
        });


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
        me.genderCombo = me.initGenderCombo(gendersStore);

        me.items = [
            {
                xtype: 'tabpanel',
                anchor: '100%, 100%',
                items: [
                    {
                        xtype: 'container',
                        border: false,
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
                                value: cfgModel.email
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                                name: 'userInfo.phone',
                                value: cfgModel.userInfo.phone
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.dateOfBirth'),
                                name: 'userInfo.dateOfBirth',
                                format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly'),
                                value: new Date(cfgModel.userInfo.dateOfBirth)
                            },
                            me.genderCombo,
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
        gendersStore.load();

        me.callParent(arguments);
    }
});