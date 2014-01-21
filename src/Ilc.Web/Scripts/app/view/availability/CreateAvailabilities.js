Ext.define('Ilc.view.availability.CreateAvailabilities', {
    xtype: 'createavailabilities',
    extend: 'Ext.window.Window',

    requires: [
        'Ilc.utils.Forms'
    ],

    layout: {
        type: 'anchor'
    },
    
    width: 500,

    defaults: {
        anchor: '100%'
    },

    _fireAddEvent: function(options) {
        var me = this;

        var model = {};

        var textboxes = me.query('textfield');

        model = Ilc.utils.Forms.extractModel(textboxes);
        model.resourceId = Ilc.Configuration.get().trainerId;

        if (options != null) {
            Ext.apply(model, options);
        }

        me.fireEvent('addavailability', me, model);
        console.log(model);
    },

    buttons: [
            {
                text: 'Create',
                handler: function(btn) {
                    var me = btn.up('window');

                    me._fireAddEvent();
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
    
    availabilityPersistedError: function (error) {
        var me = this;

        Ext.Msg.show({
            title: 'Error - Conflict',
            msg: 'There is a conflict with pre-existing availability days. Would you like to override them?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId) {
                if (buttonId == 'yes') {

                    me._fireAddEvent({
                        override: true
                    });
                }
            }
        });
    },

    initComponent: function () {
        var me = this;

        var templatesStore = Ext.create('Ilc.store.Templates');

        me.items = [
            {
                xtye: 'container',
                border: false,
                margin: '5 0 5 0',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        columnWidth: 1,
                        editable: false,
                        xtype: 'combobox',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'templateId',
                        fieldLabel: 'Template',
                        store: templatesStore
                    },
                    {
                        xtype: 'button',
                        cls: 'clean-button',
                        iconCls: 'icon-info',
                        handler: function () {
                            var container = this.up();
                            var record = container.items.items[0].lastSelection[0];
                            var window = Ext.create('Ilc.view.templates.Edit', {
                                template: record,
                                editable: false
                            });

                            window.show();
                        }
                    }
                ],
            },
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