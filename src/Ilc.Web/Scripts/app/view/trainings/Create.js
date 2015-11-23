Ext.define('Ilc.view.trainings.Create', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.utils.Forms',
        'Ext.ux.form.ColorField'
    ],
        
    defaults: {
        xtype: 'combobox',
        anchor: '100%',
        labelWidth: 120
    },

    title: Ilc.resources.Manager.getResourceString('view.trainings.create.title'),
    layout: 'anchor',
    width: 400,
    modal: true,
    bodyPadding: 10,
    
    contactsComboBox: null,
    customerComboBox: null,
    studentsComboBox: null,
    requiredStudentsField: null,
    priceField: null,
    dateOfValidationField: null,
    
    onPublicCheckboxChange: function(checkbox, checked) {
        var me = this;

        if (checked) {
            me.requiredStudentsField.show();
            me.priceField.show();
            me.dateOfValidationField.show();
            
            me.customerComboBox.hide();
            me.contactsComboBox.hide();
            me.studentsComboBox.hide();
        } else {
            me.requiredStudentsField.hide();
            me.priceField.hide();
            me.dateOfValidationField.hide();

            me.customerComboBox.show();
            me.contactsComboBox.show();
            me.studentsComboBox.show();
        }
    },

    initComponent: function () {
        var me = this;
        var customersStore = Ext.create('Ilc.store.Customers', {
            pageSize: 1000
        });
        var studentsStore = Ext.create('Ilc.store.Students', {
            data: [],
            pagesize: 1000
        });
        var trainingSystemsStore = Ext.create('Ilc.store.TrainingSystems');
        var subjectsStore = Ext.create('Ilc.store.Subjects', {
            pageSize: 1000
        });
        var trainersStore = Ext.create('Ilc.store.Trainers', {
            pageSize: 1000
        });

        var salesUsersStore = Ext.create('Ilc.store.Users', {
            claims: 'tasks-sales'
        });
        var coordinatorsUsersStore = Ext.create('Ilc.store.Users', {
            claims: 'tasks-coordinator'
        });
        var administratorsUsersStore = Ext.create('Ilc.store.Users', {
            claims: 'tasks-administrator'
        });

        var contactsStore = Ext.create('Ilc.store.Contacts', {
            isTrainingContact: true
        });

        me.contactsComboBox = Ext.create('Ext.form.ComboBox', {
            store: contactsStore,
            multiSelect: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'contacts',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.contact'),
            anchor: '100%',
            labelWidth: 120
        });

        me.customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            forceSelection: 'true',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            anchor: '100%',
            labelWidth: 120
        });

//        me.studentsComboBox = Ext.create('Ext.form.ComboBox', {
//            store: studentsStore,
//            queryMode: 'local',
//            displayField: 'name',
//            valueField: 'id',
//            fieldLabel: Ilc.resources.Manager.getResourceString('common.students'),
//            name: 'students',
//            multiSelect: true,
//            anchor: '100%',
//            labelWidth: 120
//        });

        var trainingSystemComboBox = Ext.create('Ext.form.ComboBox', {
            store: trainingSystemsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'gradingSystemId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.system'),
            anchor: '100%',
            labelWidth: 120
        });

        var subjectComboBox = Ext.create('Ext.form.ComboBox', {
            store: subjectsStore,
            queryMode: 'local',
            displayField: 'name',
            forceSelection: 'true',
            minChars: 1,
            triggerAction: 'all',
            valueField: 'id',
            name: 'subjectId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.subject'),
            anchor: '100%',
            labelWidth: 120
        });

        var trainersComboBox = Ext.create('Ext.form.ComboBox', {
            store: trainersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'trainerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.trainer'),
            anchor: '100%',
            labelWidth: 120
        });

        me.requiredStudentsField = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Required students',
            anchor: '100%',
            hidden: true,
            labelWidth: 120,
            name: 'requiredStudents'
        });

        me.priceField = Ext.create('Ext.ux.form.NumericField', {
            fieldLabel: 'Price / student',
            anchor: '100%',
            hidden: true,
            labelWidth: 120,
            name: 'price'
        });

        me.dateOfValidationField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Validation at',
            anchor: '100%',
            hidden: true,
            labelWidth: 120,
            name: 'dateOfValidation',
            format: Ilc.resources.Manager.getResourceString('formats.extjsdate')
        });

        me.customerComboBox.on('select', function (comboBox, records, eOpts) {
            contactsStore.updateCustomerId(records[0].data.id);
            contactsStore.load();
            
            studentsStore.load({
                params: {
                    customerId: records[0].data.id
                }
            });
        });

//        subjectComboBox.on('select', function (comboBox, records, eOpts) {
//            trainersStore.load({
//                params: {
//                    subjectId: records[0].get('id')
//                }
//            });
//        });

        me.items = [
              {
                  xtype: 'textfield',
                  fieldLabel: Ilc.resources.Manager.getResourceString('common.trainingId'),
                  name: 'trainingId',
              },
//            {
//                xtype: 'checkbox',
//                fieldLabel: 'Public',
//                name: 'public',
//                listeners: {
//                    scope: this,
//                    change: me.onPublicCheckboxChange
//                }
//            },
          
            me.customerComboBox,
            subjectComboBox,
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.color'),
                xtype: 'colorfield',
                name: 'color'
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.startDate'),
                // format: Ilc.resources.Manager.getResourceString('formats.extjsdate'),
                name: 'desiredStartDate',
                anchor: '100%',
                format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly')
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.endDate'),
                // format: Ilc.resources.Manager.getResourceString('formats.extjsdate'),
                name: 'desiredEndDate',
                anchor: '100%',
                format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly')
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.add'),
                handler: function (btn, e) {
                    var model = {};

                    var textboxes = me.query('field');

                    model = Ilc.utils.Forms.extractModel(textboxes);

                    var fields = ['customerId', 'subjectId', 'color', 'desiredStartDate'];
                    me.validateWrapper(function() {
                        me.fireEvent('addTraining', me, model);
                    }, fields, textboxes, model);

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
            'addTraining'
        );

        subjectsStore.load();
        trainingSystemsStore.load();
        
        me.callParent(arguments);
    }
    
    
});