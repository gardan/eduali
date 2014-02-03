Ext.define('Ilc.view.users.Edit', {
    extend: 'Ext.window.Window',
    width: 800,
    bodyPadding: 0,

    xtype: 'edituserwindow',

    layout: 'anchor',

    defaults: {
        anchor: '100%'
    },

    hideAction: 'destroy',

    user: null,
    rolesStore: null,
    avatarUploader: null,
    genderCombo: null,

    requires: [
        'Ilc.utils.Forms'
    ],

    userUpdated: function() {
        this.avatarUploader.initUpload();
    },

    unassignRoleComplete: function() {
        this.rolesStore.load({
            params: {
                userId: this.user.get('id')
            }
        });
    },

    onUploadComplete: function () {
        this.fireEvent('useredited');
        this.close();
    },

    initUploader: function () {
        var me = this;

        var userId = me.user.get('userInfo').id;
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
            if (me.user.get('userInfo').gender == record.get('id')) {
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
            store: store,
            padding: '0 10 0 10'
        });
    },

    initComponent: function() {
        var me = this;

        var rolesStore = Ext.create('Ilc.store.Roles');
        me.rolesStore = rolesStore;
        var gendersStore = Ext.create('Ilc.store.Genders', {
            listeners: {
                'load': me.onGenderLoad,
                scope: me
            }
        });

        me.avatarUploader = me.initUploader();
        me.genderCombo = me.initGenderCombo(gendersStore);

        var rolesGrid = Ext.create('Ilc.grid.Roles', {
            store: rolesStore,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Assign role',
                            handler: function () {
                                var unassignedRolesStore = Ext.create('Ilc.store.Roles');

                                unassignedRolesStore.load({
                                    params: {
                                        assigned: false,
                                        userId: me.user.get('id')
                                    }
                                });

                                var window = Ext.create('Ext.window.Window', {
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'id',
                                            fieldLabel: 'Roles',
                                            name: 'roleId',
                                            store: unassignedRolesStore
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: 'Assign',
                                            handler: function () {
                                                var inputs = window.query('textfield');
                                                var model = Ilc.utils.Forms.extractModel(inputs);
                                                model.userId = me.user.get('id');

                                                me.fireEvent('assignrole', window, model, {
                                                    rolesStore: rolesStore,
                                                    rolesLoadObj: {
                                                        params: {
                                                            userId: me.user.get('id')
                                                        }
                                                    }
                                                });
                                            }
                                        },
                                        {
                                            text: Ilc.resources.Manager.getResourceString('common.cancel'),
                                            handler: function() {
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

        rolesGrid.on('delete', function(grid, record) {
            // Delete role from user
            var model = {
                userId: me.user.get('id'),
                roleId: record.get('id')
            };

            me.fireEvent('unassignrole', me, model);
        });

        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'General',
                        defaults: {
                            xtype: 'textfield',
                            anchor: '100%',
                            padding: '0 10 0 10'
                        },
                        layout: 'anchor',
                        items: [
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                                name: 'userInfo.firstName',
                                value: me.user.get('userInfo').firstName,
                                padding: '10 10 0 10'
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                                name: 'userInfo.lastName',
                                value: me.user.get('userInfo').lastName
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                                name: 'userInfo.email',
                                value: me.user.get('userInfo').email
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                                name: 'userInfo.phone',
                                value: me.user.get('userInfo').phone
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.dateOfBirth'),
                                name: 'userInfo.dateOfBirth',
                                format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly'),
                                value: new Date(me.user.get('userInfo').dateOfBirth)
                            },
                            me.genderCombo,
                            me.avatarUploader
                        ],
                        buttons: [
                            {
                                text: Ilc.resources.Manager.getResourceString('common.save'),
                                handler: function(button) {
                                    var model = {};
                                    var parent = button.up().up();
                                    var inputs = parent.query('textfield');
                                    model = Ilc.utils.Forms.extractModel(inputs);
                                    model.id = me.user.get('id');

                                    me.fireEvent('updateuser', me, model);
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
                        title: 'Roles',
                        items: [
                            rolesGrid
                        ]
                    }
                ]
            }
        ],
        
        rolesStore.load({
            params: {
                userId: me.user.get('id')
            }
        });
        gendersStore.load();

        me.addEvents(
            'assignrole',
            'unassignrole',
            'updateuser'
        );

        me.callParent(arguments);
    }
});