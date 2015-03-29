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
        // this is called after the student has been added by the backend and now the avatar needs to be uploaded
        var userId = student.get('userInfo').id;
        this.avatarUploader.setUploadUrl('api/users/' + userId + '/avatar'); // Method: PUT
        this.avatarUploader.initUpload();
    },

    studentAddError: function (err) {
        // this is called when there is an error in the backend that causes the student to fail to be created
        this.queryById('email').invalidText = err.responseStatus.message; // even if we change this, the message is not showed when hover over the email text field. WHY?
        this.queryById('email').markInvalid(err);
        Ext.MessageBox.alert('Cannot create student',err.responseStatus.message);
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
        var okEmail = false;
        var okCustomer = false;

        function enableBtn(){
            if (okEmail && okCustomer){
                Ext.getCmp('saveBtn').enable();
            }
            else {
                Ext.getCmp('saveBtn').disable();
            }
        };

        

        var customersStore = Ext.create('Ilc.store.Customers');
        var gendersStore = Ext.create('Ilc.store.Genders');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            id: 'customerCB',
            store: customersStore,
            forceselection: true,
            editable: false,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            emptyText: Ilc.resources.Manager.getResourceString('common.customer'), // add text for mandatory fields in the translation
            anchor: '100%',
            allowBlank: false,
            listeners:{
                change: function (field, newVal, oldVal) {
                    if (Boolean(newVal)) {
                        okCustomer = true;
                        console.log(okCustomer);
                        enableBtn();
                    }
                    else {
                        okCusomer = false;
                        console.log(okCustomer);
                        enableBtn();
                    }
                }
            }
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
                emptyText:  Ilc.resources.Manager.getResourceString('common.email'), // add text for mandatory fields in the translation
                name: 'userInfo.email',
                vtype: 'email',
                id: 'email',
                allowBlank: false,
                listeners: {
                    change: function (field, newVal, oldVal) {
                        if (this.isValid()){
                            okEmail = true;
                            enableBtn();
                        }
                        else {
                            okEmail = false;
                            enableBtn();
                        }
                    }
                }

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
            customerComboBox,
            me.genderCombo,
            me.avatarUploader
        ];

        me.buttons = [
             {
                 id: 'saveBtn',
                 text: Ilc.resources.Manager.getResourceString('common.add'),
                 disabled: true,
                 handler: function () {
                     var model = {}; 
                     var inputs = me.query('textfield'); 
                     model = Ilc.utils.Forms.extractModel(inputs); // This creates a model based on what is in the form.  

                     var fields = ['customerId', 'subjectId', 'color', 'desiredStartDate', 'desiredEndDate'];
                     
                     me.fireEvent('addStudent', me, model); // this leads to calling the addStudent function from the List view which will fire an event to reach finally the Students controller
                     Ext.getCmp('saveBtn').disable();  // we disable the buttons until the student is created. This way we avoid user clicking this several times if it takes long to create the student
                     Ext.getCmp('cancelBtn').disable();
                 }
             },
            {
                id: 'cancelBtn',
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function () {
                    me.close();
                }
            },
        ];

        
        // here we add the events that can be fired by this window
        me.addEvents(
            'addStudent',
            'studentadded'
        );
        gendersStore.load();
        
        me.callParent(arguments);
        enableBtn();
    }
});
