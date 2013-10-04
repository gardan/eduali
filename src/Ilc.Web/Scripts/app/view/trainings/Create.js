Ext.define('Ilc.view.trainings.Create', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.utils.Forms'
    ],
    layout: 'anchor',
    modal: true,
    bodyPadding: 10,
    constructor: function () {
        var me = this;
        var customersStore = Ext.create('Ilc.store.Customers');
        var studentsStore = Ext.create('Ilc.store.Students', {
            data: []
        });
        var trainingSystemsStore = Ext.create('Ilc.store.TrainingSystems');
        var subjectsStore = Ext.create('Ilc.store.Subjects');
        var trainersStore = Ext.create('Ilc.store.Trainers');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            anchor: '100%'
        });

        var studentsComboBox = Ext.create('Ext.form.ComboBox', {
            store: studentsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.students'),
            name: 'students',
            multiSelect: true,
            anchor: '100%'
        });

        var trainingSystemComboBox = Ext.create('Ext.form.ComboBox', {
            store: trainingSystemsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'trainingSystem',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.system'),
            anchor: '100%'
        });

        var subjectComboBox = Ext.create('Ext.form.ComboBox', {
            store: subjectsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'subjectId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.subject'),
            anchor: '100%'
        });

        var trainersComboBox = Ext.create('Ext.form.ComboBox', {
            store: trainersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'trainerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.trainer'),
            anchor: '100%'
        });

        customerComboBox.on('select', function (comboBox, records, eOpts) {
            studentsStore.load({
                params: {
                    customerId: records[0].data.id
                }
            });
        });

        subjectComboBox.on('select', function (comboBox, records, eOpts) {
            trainersStore.load({
                params: {
                    subjectId: records[0].get('id')
                }
            });
        });

        me.items = [
            customerComboBox,
            subjectComboBox,
            trainingSystemComboBox,
            trainersComboBox,
            studentsComboBox,
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.startDate'),
                format: Ilc.resources.Manager.getResourceString('formats.extjsdate'),
                name: 'desiredStartDate',
                anchor: '100%'
            },
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.endDate'),
                format: Ilc.resources.Manager.getResourceString('formats.extjsdate'),
                name: 'desiredEndDate',
                anchor: '100%'
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.add'),
                handler: function (btn, e) {
                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);


                    me.fireEvent('addTraining', me, model);
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

        me.callParent(arguments);
    }
});