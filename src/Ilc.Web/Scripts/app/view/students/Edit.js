Ext.define('Ilc.view.students.Edit', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.student'),

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },
    layout: 'anchor',
    width: 500,
    
    minHeight: 300,

    avatarUploader: null,
    student: null,
    genderCombo: null,
        
    onUploadComplete: function () {
        var me = this;
        this.fireEvent('studentedited');
        me.close();
    },

    studentEdited: function () {
        this.avatarUploader.initUpload();
    },


    onGenderLoad: function (store, records, successful) {
        var me = this;
        Ext.Array.forEach(records, function(record) {
            if (me.student.get('userInfo').gender == record.get('id')) {
                me.genderCombo.select(record);
            }
        });
    },
        
    initGenderCombo: function(store) {
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

        var cfgModel = me.model;
        me.student = cfgModel;
        
        var customersStore = Ext.create('Ilc.store.Customers');
        var gendersStore = Ext.create('Ilc.store.Genders', {
            listeners: {
                'load': me.onGenderLoad,
                scope: me
            }
        });


        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer')
        });

        customersStore.on('load', function () {
            var store = this;

            var studentCustomer = store.findRecord('id', cfgModel.get('customer').id);
            customerComboBox.select(studentCustomer);
        });

        var userId = cfgModel.get('userInfo').id;
        var avatarUrl = cfgModel.get('userInfo').avatarLocation;

        me.avatarUploader = Ext.create('Ilc.uploader.Avatar', {
            avatarUrl: avatarUrl,
            uploadUrl: 'api/users/' + userId + '/avatar', // Method: PUT
            fieldLabel: 'Avatar',
            listeners: {
                'uploadcomplete': me.onUploadComplete,
                
                scope: me
            }
        });

        me.genderCombo = me.initGenderCombo(gendersStore);

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                name: 'userInfo.firstName',
                value: cfgModel.get('userInfo').firstName
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                name: 'userInfo.lastName',
                value: cfgModel.get('userInfo').lastName
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                name: 'userInfo.email',
                value: cfgModel.get('userInfo').email
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                name: 'userInfo.phone',
                value: cfgModel.get('userInfo').phone
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.dateOfBirth'),
                name: 'userInfo.dateOfBirth',
                format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly'),
                value:  new Date(cfgModel.get('userInfo').dateOfBirth)
            },
            me.genderCombo,
            me.avatarUploader
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function () {
                    var model = {};
                    var inputs = me.query('textfield');
                    
                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = cfgModel.get('id');
                    me.fireEvent('editStudent', me, model);
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
            'editStudent',
            'studentedited'
        );

        gendersStore.load();

        me.callParent(arguments);
    }
});