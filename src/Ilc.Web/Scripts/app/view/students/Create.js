Ext.define('Ilc.view.students.Create', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.newStudent'),

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
    genderCombo: null,

    studentAdded: function (student) {
        var userId = student.get('userInfo').id;
        this.avatarUploader.setUploadUrl('api/users/' + userId + '/avatar'); // Method: PUT

        this.avatarUploader.initUpload();
    },

    onUploadComplete: function () {
        this.fireEvent('studentadded');
        this.close();
    },

    initUploader: function () {
        var me = this;
        me.avatarUploader = Ext.create('Ilc.uploader.Avatar', {
            avatarUrl: 'api/users/0/avatar',
            // uploadUrl: 'api/users/' + userId + '/avatar', // Method: PUT
            fieldLabel: 'Avatar',
            listeners: {
                'uploadcomplete': me.onUploadComplete,

                scope: me
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

    initComponent: function () {
        var me = this;

        var customersStore = Ext.create('Ilc.store.Customers');
        var gendersStore = Ext.create('Ilc.store.Genders');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            anchor: '100%'
        });

        me.initUploader();
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
            customerComboBox,
            me.genderCombo,
            me.avatarUploader
        ];

        me.buttons = [
             {
                 text: Ilc.resources.Manager.getResourceString('common.add'),
                 handler: function () {
                     var model = {};
                     var inputs = me.query('textfield');

                     model = Ilc.utils.Forms.extractModel(inputs);

                     console.log(model);
                     me.fireEvent('addStudent', me, model);
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
            'addStudent',
            'studentadded'
        );
        gendersStore.load();
        me.callParent(arguments);
    }
});
