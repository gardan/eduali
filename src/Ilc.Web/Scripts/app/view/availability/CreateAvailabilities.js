Ext.define('Ilc.view.availability.CreateAvailabilities', {
    xtype: 'createavailabilities',
    extend: 'Ext.window.Window',
    
    requires: [
        'Ilc.utils.Forms'
    ],

    buttons: [
            {
                text: 'Create',
                handler: function(btn) {
                    var me = btn.up('window');

                    var model = {};

                    var textboxes = me.query('textfield');

                    model = Ilc.utils.Forms.extractModel(textboxes);
                    model.resourceId = Ilc.Configuration.get().trainerId;
                    me.fireEvent('addavailability', me, model);
                    console.log(model);
                }
            },
            {
                text: 'Cancel',
                handler: function(btn) {
                    btn.up('window').close();
                }
            }
    ],
    
    availabilityPersisted: function() {
        var me = this;

        me.fireEvent('addedavailability');
        me.close();
    },

    initComponent: function () {
        var me = this;

        var templatesStore = Ext.create('Ilc.store.Templates');

        me.items = [
            {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'templateId',
                fieldLabel: 'Template',
                store: templatesStore
            },
            // {
            //     xtype: 'container',
            //     defaults: {
            //         layout: 'hbox'
            //     },
            //     items: [
            //         {
            //             xtype: 'container',
            //             items: [
            //                 {
            //                     xtype: 'label',
            //                     text: 'Day 1'
            //                 },
            //                 {
            //                     xtype: 'textfield',
            //                     value: 'T08:00:00'
            //                 },
            //                 {
            //                     xtype: 'textfield',
            //                     value: 'T16:00:00'
            //                 }
            //             ]
            //         },
            //         {
            //             xtype: 'container',
            //             items: [
            //                 {
            //                     xtype: 'label',
            //                     text: 'Day 2'
            //                 },
            //                 {
            //                     xtype: 'textfield',
            //                     value: 'T08:00:00'
            //                 },
            //                 {
            //                     xtype: 'textfield',
            //                     value: 'T16:00:00'
            //                 }
            //             ]
            //         }
            //     ]
            // },
            {
                xtype: 'datefield',
                fieldLabel: 'Start date',
                name: 'startDate'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'End date',
                name: 'endDate'
            }
        ];

        me.addEvents('addavailability', 'addedavailability');

        templatesStore.load();
        me.callParent(arguments);
    }
});