Ext.define('Ilc.view.trainings.view.Contacts', {
    extend: 'Ilc.view.customers.contacts.List',

    xtype: 'contactstraininglist',

    enableContextMenu: false,

    columns: [
    {
        dataIndex: 'firstName',
        flex: 1,
        text: Ilc.resources.Manager.getResourceString('common.name'),
        renderer: function(value, meta, record) {
            return record.get('firstName') + record.get('lastName');
        }
    }],
    
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'icon-add',
                    cls: 'clean-button',
                    text: Ilc.resources.Manager.getResourceString('common.addContact'),
                    
                    handler: function () {
                        var me = this.up('contactstraininglist');
                        
                        var contactsStore = Ext.create('Ilc.store.Contacts', {
                            customerId: me.customerId
                        });

                        contactsStore.load();

                        var window = Ext.create('Ext.window.Window', {
                            width: 300,
                            items: [
                                {
                                    xtype: 'multiselect',
                                    store: contactsStore,
                                    valueField: 'id',
                                    displayField: 'name',
                                    name: 'ids'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Add',
                                    handler: function() {
                                        var preModel = Ilc.utils.Forms.extractModel(window.query('multiselect'));
                                        var model = {
                                            ids: []
                                        };

                                        Ext.Array.forEach(preModel.ids, function(obj) {
                                            model.ids.push(obj.name);
                                        });

                                        var url = 'api/trainings/' + me.trainingId + '/contacts';

                                        var contactTrainingModel = Ext.create('Ilc.model.ContactTraining', model);
                                        contactTrainingModel.save({
                                            url: url,
                                            callback: function() {
                                                me.store.reload();
                                                window.close();
                                            }
                                        });
                                    },
                                },
                                {
                                    text: 'Cancel',
                                    handler: function () { window.close(); }
                                }
                            ]
                        }).show();
                    }
                }
            ]
        }
    ],
    
    config: {
        trainingId: null,
        customerId: null
    },

    initComponent: function () {
        var me = this;
        me.on('itemcontextmenu', me.onItemContextMenu);
        this.callParent();
    },
    
    onItemContextMenu: function (view, record, item, index, e) {
        var me = this;
        var delUrl = 'api/trainings/' + me.trainingId + '/contacts';
        e.stopEvent();

        if (me.contactContextMenu == null) {
            me.contactContextMenu = Ext.create('Ext.menu.Menu', {
                items: [
                    {
                        text: 'Delete',
                        handler: function () {

                            me.contactContextMenu.record.destroy({
                                success: function () {
                                    
                                },
                                url: delUrl
                            });
                        }
                    }
                ]
            });
        }

        me.contactContextMenu.record = record;
        me.contactContextMenu.showAt(e.getXY());
    },
});