Ext.define('Ilc.view.users.Create', {
    extend: 'Ext.window.Window',

    hideAction: 'destroy',
    
    width: 400,
    layout: 'anchor',
    title: 'New user',

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    requires: [
    'Ilc.utils.Forms'
    ],

    userCreated: function (user) {
        var uploadUrl = user.get('userInfo').avatarLocation;
        this.avatarUploader.setUploadUrl(uploadUrl);
        this.avatarUploader.initUpload();
    },

    onUploadComplete: function () {
        this.fireEvent('useradded');
        this.close();
    },

    initUploader: function () {
        var me = this;
        var uploader = Ext.create('Ilc.uploader.Avatar', {
            avatarUrl: 'api/users/0/avatar',
            // uploadUrl: 'api/users/' + userId + '/avatar', // Method: PUT
            fieldLabel: 'Avatar',
            listeners: {
                'uploadcomplete': me.onUploadComplete,
                scope: me
            }
        });
        return uploader;
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

    initComponent: function () {
        var me = this;

        var rolesStore = Ext.create('Ilc.store.Roles');
        rolesStore.load();
        var gendersStore = Ext.create('Ilc.store.Genders');
        gendersStore.load();

        me.avatarUploader = me.initUploader();
        me.genderCombo = me.initGenderCombo(gendersStore);

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                name: 'userInfo.email',
            },
            {
                fieldLabel: 'Password',
                name: 'password'
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                name: 'userInfo.firstName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                name: 'userInfo.lastName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                name: 'userInfo.phone',
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.dateOfBirth'),
                name: 'userInfo.dateOfBirth',
                format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly')
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.address'),
                name: 'userInfo.address',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.city'),
                name: 'userInfo.city',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.country'),
                name: 'userInfo.country',
            },

            me.genderCombo,
            {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'roles',
                fieldLabel: 'Roles',
                store: rolesStore,
                multiSelect: true,
            },
            me.avatarUploader
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.createUser'),
                handler: function () {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);

                    console.log(model);

                    me.fireEvent('createuser', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function() {
                    me.close();
                }
            }
        ];


        me.addEvents(
            'createuser'
        );

        me.callParent();
    }
});