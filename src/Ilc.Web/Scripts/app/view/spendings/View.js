Ext.define('Ilc.view.spendings.View', {
    extend: 'Ext.panel.Panel',
    xtype: 'spendingsview',
    
    requires: [
        'Ext.ux.form.NumericField'
    ],

    spendings: null, // required
    hours: null, // required

    layout: 'anchor',
    
    defaults: {
        xtype: 'numericfield',
        margin: 10,
        // anchor: '100%'
    },

    totalLabel: null,

    updateTotal: function () {
        var totalExpenses = parseFloat(this.spendings.supplies) + parseFloat(this.spendings.transport) + parseFloat(this.spendings.trainer);
        this.totalLabel.setText('Total expenses: ' + totalExpenses);
    },

    editComplete: function () {
        this.fireEvent('editcomplete');
    },

    initComponent: function () {
        var me = this;

        var trainerCostField = Ext.create('Ext.ux.form.NumericField', {
            disabled: true,
            value: me.spendings.trainer,
            width: 100,
            useThousandSeparator: false,
            name: 'trainer',
            listeners: {
                change: function (numericfield, newValue, oldValue) {
                    me.spendings.trainer = newValue;
                    me.updateTotal();
                }
            }
        });

        
        me.totalLabel = Ext.create('Ext.form.Label');
        me.updateTotal();

        me.items = [
            {
                xtype: 'container',
                layout: 'column',
                items: [
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Trainer',
                        value: me.spendings.trainer / me.hours,
                        width: 250,
                        listeners: {
                            change: function (numericfield, newValue, oldValue) {
                                trainerCostField.setValue(newValue * me.hours);
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        text: 'x ' + me.hours + ' hours =',
                        padding: 5
                    },
                    trainerCostField
                ]
            },
            {
                useThousandSeparator: false,
                fieldLabel: 'Supplies',
                value: me.spendings.supplies,
                width: 250,
                name: 'supplies',
                listeners: {
                    change: function (numericfield, newValue) {
                        me.spendings.supplies = newValue;
                        me.updateTotal();
                    }
                }
            },
            {
                useThousandSeparator: false,
                fieldLabel: 'Transport',
                value: me.spendings.transport,
                width: 250,
                name: 'transport',
                listeners: {
                    change: function (numericfield, newValue) {
                        me.spendings.transport = newValue;
                        me.updateTotal();
                    }
                }
            },
            me.totalLabel
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.update'),
                handler: function () {
                    var model = me.spendings;
                    var inputs = me.query('numericfield');

                    // TODO: move to form helper class
                    for (var i = 1; i < inputs.length; i++) { // we start with i = 1 because we don't need the first field
                        var input = inputs[i];
                        model[input.name] = input.getRawValue();
                    }

                    me.fireEvent('updatespendings', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function () {
                    me.fireEvent('cancelclicked');
                }
            }
        ];

        me.addEvents(
            'updatespendings',
            'cancelclicked',
            'editcomplete'
        );

        this.callParent(arguments);
    }
});