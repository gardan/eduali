Ext.define('Ilc.view.trainings.Create', {
    extend: 'Ext.window.Window',
    
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
            debugger;
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
                    var model = {
                        customerId: '',
                        trainingSystemId: '',
                        subjectId: '',
                        desiredStartDate: '',
                        desiredEndDate: '',
                        students: []
                    };

                    var textboxes = me.query('textfield');

                    for (var i = 0; i < textboxes.length; i++) {
                        var textfield = textboxes[i];
                        if (textfield.lastSelection) { // combobox

                            if (textfield.multiSelect) { // multiple items
                                model[textfield.name] = [];
                                for (var z = 0; z < textfield.lastSelection.length; z++) {
                                    var selectedItem = textfield.lastSelection[z];
                                    model[textfield.name].push(selectedItem.data);
                                }
                            } else { // single items
                                
                                model[textfield.name] = textfield.lastSelection[0].data[textfield.valueField];
                            }


                        } else { // simple textfield
                            // we know that there should only be datefields
                            var date = textfield.getRawValue();
                            if (date) {
                                model[textfield.name] = moment(date).format();
                            }
                        }
                    }
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