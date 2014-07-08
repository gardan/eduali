Ext.define('Ilc.view.trainers.Create', {
    extend: 'Ext.window.Window',
    
    title: Ilc.resources.Manager.getResourceString('common.newTrainer'),

    requires: [
        'Ilc.utils.Forms'
    ],
    
    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },
    
    layout: 'anchor',
    bodyPadding: 10,
    
    avatarUploader: null,

    trainerCreated: function (trainer) {
        var uploadUrl = trainer.get('userInfo').avatarLocation;
        this.avatarUploader.setUploadUrl(uploadUrl);
        this.avatarUploader.initUpload();
    },

    onUploadComplete: function () {
        this.fireEvent('traineradded');
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
            editable: false,
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'userInfo.gender',
            store: store
        });
    },

    constructor: function () {
        var me = this;

        var subjectsStore = Ext.create('Ilc.store.Subjects');
        var gendersStore = Ext.create('Ilc.store.Genders');

        me.avatarUploader = me.initUploader();
        me.genderCombo = me.initGenderCombo(gendersStore);

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                name: 'userInfo.firstName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                name: 'userInfo.lastName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                name: 'userInfo.email',
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
            me.genderCombo,
            {
                xtype: 'combobox',
                editable: false,
                store: subjectsStore,
                queryMode: 'local',
                displayField: 'name',
                multiSelect: true,
                valueField: 'id',
                name: 'subjects',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.subject'),
            },
            me.avatarUploader
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.add'),
                handler: function (button, e) {
                    var model = {};
                    var inputs = me.query('textfield');
                    model = Ilc.utils.Forms.extractModel(inputs);

                    me.fireEvent('addTrainer', me, model);
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
            'addTrainer'
        );

        subjectsStore.load();
        gendersStore.load();
        
        me.callParent(arguments);
    }
});