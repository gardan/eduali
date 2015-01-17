Ext.define('Ilc.view.offers.Create', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.ux.form.NumericField'
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
            name: 'trainingId',
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
                    fieldLabel: 'Active'
                },
                this.getTrainingsDropDown(),
                {
                    xtype: 'numericfield',
                    fieldLabel: 'Amount'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Sent to customer'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Accepted by customer'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Payment due date'
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Terms and conditions'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Payed'
                }
            ]
        });
    },

    initComponent: function () {

        this.items = [
            this.getCreateOfferPanel()
        ];

        this.callParent(arguments);
    }
});