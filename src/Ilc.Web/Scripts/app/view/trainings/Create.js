﻿Ext.define('Ilc.view.trainings.Create', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.utils.Forms'
    ],

    constructor: function () {
        var me = this;
        var customersStore = Ext.create('Ilc.store.Customers');
        var studentsStore = Ext.create('Ilc.store.Students', {
            data: []
        });
        var trainingSystemsStore = Ext.create('Ilc.store.TrainingSystems');
        var subjectsStore = Ext.create('Ilc.store.Subjects');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: 'Choose customer'
        });

        var studentsComboBox = Ext.create('Ext.form.ComboBox', {
            store: studentsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            fieldLabel: 'Choose students',
            name: 'students',
            multiSelect: true
        });

        var trainingSystemComboBox = Ext.create('Ext.form.ComboBox', {
            store: trainingSystemsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'trainingSystem',
            fieldLabel: 'Choose system'
        });

        var subjectComboBox = Ext.create('Ext.form.ComboBox', {
            store: subjectsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'subjectId',
            fieldLabel: 'Choose subject'
        });

        customerComboBox.on('select', function (comboBox, records, eOpts) {
            studentsStore.load({
                params: {
                    customerId: records[0].data.id
                }
            });
        });
        
        me.items = [
            customerComboBox,
            subjectComboBox,
            trainingSystemComboBox,
            studentsComboBox,
            {
                xtype: 'datefield',
                fieldLabel: 'Start date',
                format: 'Y-m-d',
                name: 'desiredStartDate'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'End date',
                format: 'Y-m-d',
                name: 'desiredEndDate'
            },
            {
                xtype: 'button',
                text: 'Create',
                handler: function (btn, e) {
                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);

                   
                    me.fireEvent('addTraining', me, model);
                }
            }
        ];

        me.addEvents(
            'addTraining'
        );

        me.callParent(arguments);
    }
});