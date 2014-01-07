Ext.define('Ilc.view.availability.CreateAvailabilities', {
    xtype: 'createavailabilities',
    extend: 'Ext.window.Window',
    
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Template',
            store: ['Morning', 'Afternoon', 'Night']
        },
        {
            xtype: 'container',
            defaults: {
                layout: 'hbox'
            },
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Day 1'
                        },
                        {
                            xtype: 'textfield',
                            value: 'T08:00:00'
                        },
                        {
                            xtype: 'textfield',
                            value: 'T16:00:00'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Day 2'
                        },
                        {
                            xtype: 'textfield',
                            value: 'T08:00:00'
                        },
                        {
                            xtype: 'textfield',
                            value: 'T16:00:00'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Start date'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'End date'
        }
    ],
    
    buttons: [
        {
            text: 'Create',
            handler: function() {
                
            }
        },
        {
            text: 'Cancel',
            handler: function(btn) {
                btn.up('window').close();
            }
        }
    ]
});