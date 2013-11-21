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

    initComponent: function () {
        var me = this;

        var trainerCostField = Ext.create('Ext.ux.form.NumericField', {
            disabled: true,
            value: me.spendings.trainer,
            name: 'trainer'
        });

        me.items = [
            {
                xtype: 'container',
                layout: 'column',
                items: [
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Trainer',
                        value: me.spendings.trainer / me.hours,
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
                fieldLabel: 'Supplies',
                value: me.spendings.supplies,
                name: 'supplies'
            },
            {
                fieldLabel: 'Transport',
                value: me.spendings.transport,
                name: 'transport'
            }
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
            'cancelclicked'
        );

        this.callParent(arguments);
    }
});