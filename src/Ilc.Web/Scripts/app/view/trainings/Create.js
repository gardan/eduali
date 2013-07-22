Ext.define('Ilc.view.trainings.Create', {
    extend: 'Ext.window.Window',
    
    constructor: function () {
        var me = this;
        var customersStore = Ext.create('Ilc.store.Customers');
        var studentsStore = Ext.create('Ilc.store.Students', {
            data: []
        });

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            fieldLabel: 'Choose customer'
        });

        var studentsComboBox = Ext.create('Ext.form.ComboBox', {
            store: studentsStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            fieldLabel: 'Choose students',
            multiSelect: true
        });

        var trainingSystemComboBox = Ext.create('Ext.form.ComboBox', {
            queryMode: 'local',
            displayField: 'name',
            valueField: 'rank',
            fieldLabel: 'Choose system'
        });

        customerComboBox.on('select', function (comboBox, records, eOpts) {
            studentsStore.add([
                { id: 1, name: 'Gheorghe Lazar', phone: '0723775755' },
                { id: 2, name: 'Vasile Paiete', phone: '0723775755' },
                { id: 3, name: 'Eric Lippert', phone: '0723775755' },
                { id: 4, name: 'Razvan Negura', phone: '0723775755' },
                { id: 5, name: 'Paltinisan Alexandru', phone: '0723775755' }
            ]);
        });
        
        me.items = [
            customerComboBox,
            studentsComboBox,
            {
                xtype: 'datefield',
                fieldLabel: 'Start date'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'End date'
            },
            {
                xtype: 'button',
                text: 'Create'
            }
        ];

        me.addEvents(
            'addTraining'
        );

        me.callParent(arguments);
    }
});