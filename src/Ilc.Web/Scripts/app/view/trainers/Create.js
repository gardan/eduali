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
        debugger;
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

    constructor: function () {
        var me = this;

        var subjectsStore = Ext.create('Ilc.store.Subjects');

        me.avatarUploader = me.initUploader();

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
                xtype: 'combobox',
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

        me.callParent(arguments);
    }
});