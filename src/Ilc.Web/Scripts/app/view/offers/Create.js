Ext.define('Ilc.view.offers.Create', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.ux.form.NumericField',
        'Ilc.utils.Forms'
    ],

    trainingsStore: null,
    padding: '10',
    border: false,
    bodyBorder: false,
    defaultValues: {
        
    },

    onCustomerSelect: function(comboBox, customers) {
        var firstSelectedCustomer = customers[0];

        this.loadTrainings({
            customerId: firstSelectedCustomer.get('id')
        });
    },

    getCustomersDropDown: function () {
        if (this.customersDropDown) return this.customersDropDown;

        this.customersStore = Ext.create('Ilc.store.Customers', {
            autoLoad: false
        });
        this.customersDropDown = Ext.create('Ext.form.ComboBox', {
            store: this.customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            listeners: {
                select: this.onCustomerSelect,
                scope: this
            },
            padding: 10
        });

        return this.customersDropDown;
    },

    loadCustomers: function (options) {
        this.customersStore.load({
            callback: R.bind(this.customersLoaded, this)
        });
    },

    loadTrainings: function(options) {
        if (!this.trainingsStore) {
            throw 'trainingsStore not initiated';
        }
        options = options || {};
        var customerId = options.customerId || 0;
        

        this.trainingsStore.load({
            callback: R.bind(this.trainingsLoaded, this),
            params: {
                customerId: customerId
            }
        });
    },

    getTrainingsDropDown: function () {
        if (this.trainingsDropDown) {
            return this.trainingsDropDown;
        }

        this.trainingsStore = Ext.create('Ilc.store.Trainings');
        this.loadTrainings();
        this.trainingsDropDown = Ext.create('Ext.form.ComboBox', {
            store: this.trainingsStore,
            queryMode: 'local',
            displayField: 'compositeId',
            valueField: 'id',
            name: 'trainings',
            multiSelect: true,
            fieldLabel: Ilc.resources.Manager.getResourceString('common.trainings'),
            padding: 10
        });
        return this.trainingsDropDown;
    },

    getCreateOfferPanel: function () {
        return Ext.create('Ext.panel.Panel', {
            width: 500,
            //border: false,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                border: false,
                bodyBorder: false,
                padding: 10,
                width: 300
            },
            items: [
                this.getCustomersDropDown(),
                {
                    checked: this.defaultValues.active,
                    xtype: 'checkbox',
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.active'),
                    name: 'active',
                },
                this.getTrainingsDropDown(),
                {
                    value: this.defaultValues.amount,
                    xtype: 'numericfield',
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.amount'),
                    name: 'amount',
                },
                {
                    value: this.defaultValues.sentAt ? new Date(this.defaultValues.sentAt) : undefined,
                    xtype: 'datefield',
                    hidden: !this.defaultValues.sentAtVisible,
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.sentAt'),
                    name: 'sentAt',
                    format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly'),
                },
                {
                    checked: this.defaultValues.accepted,
                    xtype: 'checkbox',
                    hidden: !this.defaultValues.acceptedByCustomerVisible,
                    fieldLabel: 'Accepted by customer',
                    name: 'accepted',
                },
                {
                    value: this.defaultValues.paymentDueAt ? new Date(this.defaultValues.paymentDueAt) : undefined,
                    xtype: 'datefield',
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.paymentDueAt'),
                    name: 'paymentDueAt',
                    format: Ilc.resources.Manager.getResourceString('formats.extjsdateonly'),
                },
                {
                    value: this.defaultValues.tos,
                    xtype: 'textarea',
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.tos'),
                    name: 'tos',
                },
                {
                    checked: this.defaultValues.payed,
                    xtype: 'checkbox',
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.payed'),
                    name: 'payed',
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
    
    onSaveClick: function () {
        var model = Ilc.utils.Forms.extractModel(this.query('textfield')),
            createOffer = Ext.create('Ilc.model.create.Offer', model);

        createOffer.set('trainings', R.map(R.prop('id'), model.trainings));


        createOffer.save({
            success: function() {
                Ext.ux.Router.redirect('offers');
            }
        });

    },

    initComponent: function () {
        this.items = [
            this.getCreateOfferPanel()
        ];
        this.loadCustomers();

        this.callParent(arguments);
    }
});