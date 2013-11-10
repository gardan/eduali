Ext.define('Ilc.view.students.Edit', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.student'),

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },
    layout: 'anchor',
    width: 500,

    constructor: function (config) {
        var me = this;

        var cfgModel = config.model;

        var customersStore = Ext.create('Ilc.store.Customers');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer')
        });

        customersStore.on('load', function () {
            var store = this;

            var studentCustomer = store.findRecord('id', cfgModel.get('customer').id);
            customerComboBox.select(studentCustomer);
        });


        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                name: 'userInfo.firstName',
                value: cfgModel.get('userInfo').firstName
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                name: 'userInfo.lastName',
                value: cfgModel.get('userInfo').lastName
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                name: 'userInfo.email',
                value: cfgModel.get('userInfo').email
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                name: 'userInfo.phone',
                value: cfgModel.get('userInfo').phone
            }
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function () {
                    var model = {};
                    var inputs = me.query('textfield');
                    
                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = cfgModel.get('id');
                    me.fireEvent('editStudent', me, model);
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
            'editStudent'
        );


        me.callParent(arguments);
    }
});