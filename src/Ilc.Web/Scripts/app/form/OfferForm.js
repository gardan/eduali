Ext.define('Ilc.form.OfferForm', {
    extend: 'Ext.form.Panel',

    xtype: 'offerform',
    
    constructor: function () {

        var languagesStore = Ext.create('Ext.data.Store', {
            fields: ['language', 'code'],
            data: [
                { language: 'English', code: 'en' },
                { language: 'German', code: 'de' }
            ]
        });
        var languages = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Language',
            store: languagesStore,
            queryMode: 'local',
            displayField: 'language',
            valueField: 'code'
        });


        var coordinatorStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'id'],
            data: [
                { name: 'Albert Guiness', id: 1 },
                { name: 'Terapia Joeff', id: 2 }
            ]
        });

        var coords = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Coordinators',
            store: coordinatorStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        });

        this.items = [
            languages,
            coords,
            {
                xtype: 'textfield',
                fieldLabel: 'Student'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'form'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'duration'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Training location'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'All in rate (excl VAT)'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Your discount 10%'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Netton all in rate'
            }
        ];

        this.callParent(arguments);
        
    }
});