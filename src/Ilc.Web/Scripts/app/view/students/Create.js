Ext.define('Ilc.view.students.Create', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.newStudent'),

    requires: [
        'Ilc.utils.Forms'
    ],
    modal: true,
    layout: 'anchor',
    bodyPadding: 10,
    constructor: function () {
        var me = this;

        var customersStore = Ext.create('Ilc.store.Customers');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            anchor: '100%'
        });

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                anchor: '100%'
            },
            customerComboBox
        ];

        me.buttons = [
             {
                 text: Ilc.resources.Manager.getResourceString('common.add'),
                 handler: function () {
                     var model = {};
                     var inputs = me.query('textfield');

                     model = Ilc.utils.Forms.extractModel(inputs);
                     model.id = training.get('id');
                     me.fireEvent('addStudent', me, model);
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
            'addStudent'
        );

        me.callParent(arguments);
    }
});
