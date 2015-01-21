Ext.define('Ilc.view.offers.Create', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.ux.form.NumericField',
        'Ilc.utils.Forms'
    ],

    trainingsStore: null,
    defaultValues: {},

    onCustomerSelect: function(comboBox, customers) {
        var firstSelectedCustomer = customers[0];

        this.loadTrainings({
            customerId: firstSelectedCustomer.get('id')
        });
    },

    getCustomersDropDown: function () {
        var customersStore = Ext.create('Ilc.store.Customers');
        
        return Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            anchor: '100%',
            labelWidth: 120,
            listeners: {
                select: this.onCustomerSelect,
                scope: this
            }
        });
    },

    loadTrainings: function(options) {
        if (!this.trainingsStore) {
            throw 'trainingsStore not initiated';
        }
        options = options || {};
        var customerId = options.customerId || 0;
        

        this.trainingsStore.load({
            params: {
                customerId: customerId
            }
        });
    },

    getTrainingsDropDown: function () {
        this.trainingsStore = Ext.create('Ilc.store.Trainings');
        this.loadTrainings();

        return Ext.create('Ext.form.ComboBox', {
            store: this.trainingsStore,
            queryMode: 'local',
            displayField: 'compositeId',
            valueField: 'id',
            name: 'trainings',
            multiSelect: true,
            fieldLabel: Ilc.resources.Manager.getResourceString('common.training'),
            anchor: '100%',
            labelWidth: 120
        });
    },

    getCreateOfferPanel: function() {
        return Ext.create('Ext.panel.Panel', {
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 120
            },
            items: [
                this.getCustomersDropDown(),
                {
                    checked: this.defaultValues.active,
                    xtype: 'checkbox',
                    fieldLabel: 'Active',
                    name: 'active'
                },
                this.getTrainingsDropDown(),
                {
                    value: this.defaultValues.amount,
                    xtype: 'numericfield',
                    fieldLabel: 'Amount',
                    name: 'amount'
                },
//                {
//                    xtype: 'checkbox',
//                    fieldLabel: 'Sent to customer',
//                    
//                },
//                {
//                    xtype: 'checkbox',
//                    fieldLabel: 'Accepted by customer'
//                },
                {
                    value: this.defaultValues.paymentDuteAt,
                    xtype: 'datefield',
                    fieldLabel: 'Payment due date',
                    name: 'paymentDueAt'
                },
                {
                    value: this.defaultValues.tos,
                    xtype: 'textarea',
                    fieldLabel: 'Terms and conditions',
                    name: 'tos'
                },
                {
                    checked: this.defaultValues.payed,
                    xtype: 'checkbox',
                    fieldLabel: 'Payed',
                    name: 'payed'
                }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: { minWidth: 100 },
                items: [
                    { xtype: 'button', text: 'Back', listeners: { click: R.bind(this.onBackClick, this) } },
                    { xtype: 'button', text: 'Save', listeners: { click: R.bind(this.onSaveClick, this) } }
                ]
            }]
        });
    },

    onBackClick: function() {
        window.history.back();
    },
    
    onSaveClick: function() {
        var model = Ilc.utils.Forms.extractModel(this.query('textfield'));
        console.log(model);
    },

    initComponent: function () {

        this.items = [
            this.getCreateOfferPanel()
        ];

        this.callParent(arguments);
    }
});