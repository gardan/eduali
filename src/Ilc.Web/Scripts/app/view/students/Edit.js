Ext.define('Ilc.view.students.Edit', {
    extend: 'Ext.panel.Panel',
    xtype: 'studenteditpanel',

    title: Ilc.resources.Manager.getResourceString('common.student'),

    requires: [
        'Ilc.utils.Forms',
        'Ilc.model.Student'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },
    layout: 'anchor',
    width: 500,
    
    minHeight: 300,
    padding: 10,
    bodyPadding: 10,
    avatarUploader: null,
    student: null,
    genderCombo: null,
        
    onUploadComplete: function () {
        var me = this;
        this.fireEvent('studentedited');
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
        
        var Student = Ext.ModelManager.getModel('Ilc.model.Student');
        var myMask = new Ext.LoadMask(Ext.ComponentQuery.query('viewport')[0], { msg: "Please wait..." });
        myMask.show();
        Student.load(me.params.id, {
            success: function (student) {
                myMask.hide();
                var cfgModel = student;
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

                me.add([
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
                        value: cfgModel.get('email')
                    },
                    {
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                        name: 'userInfo.phone',
                        value: cfgModel.get('userInfo').phone
                    },
                    {
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.mobile'),
                        name: 'userInfo.mobile',
                        value: cfgModel.get('userInfo').mobile
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
                ]);
                
                gendersStore.load();
            }
        });
        
        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function () {
                    var model = {};
                    var inputs = me.query('textfield');
                    
                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = me.student.get('id');
                    me.fireEvent('editStudent', me, model);
                }
            }
        ];

        me.addEvents(
            'editStudent',
            'studentedited'
        );

       

        me.callParent(arguments);
    }
});