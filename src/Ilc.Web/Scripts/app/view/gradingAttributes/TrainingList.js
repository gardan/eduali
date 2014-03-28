Ext.define('Ilc.view.gradingAttributes.TrainingList', {
    extend: 'Ext.grid.Panel',
    xtype: 'trainingattributeslist',

    requires: [
        'Ext.ux.form.MultiSelect'
    ],

    config: {
        trainingId: null,
        allowEdit: null
    },

    columns: [
        {
            dataIndex: 'name',
            title: 'Name',
            flex: 1,
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Add attributes',
                    listeners: {
                        click: function () {
                            var me = this.up('trainingattributeslist');
                            var store = Ext.create('Ilc.store.GradingAttributes');
                            
                            me.window = Ext.create('Ext.window.Window', {
                                minWidth: 300,
                                items: [
                                    {
                                        xtype: 'multiselect',
                                        valueField: 'id',
                                        displayField: 'name',
                                        store: store
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Add',
                                        handler: function() {
                                            var multiselect = me.window.query('multiselect')[0];
                                            var model = {
                                                gradingAttributes: [],
                                                trainingId: me.getTrainingId()
                                            };

                                            Ext.Array.forEach(multiselect.getValue(), function (id) {
                                                model.gradingAttributes.push({
                                                    id: id
                                                });
                                            });

                                            me.fireEvent('addattribute', me, model);
                                        },
                                    },
                                    {
                                        text: 'Cancel',
                                        handler: function() {
                                            me.window.close();
                                        }
                                    }
                                ]
                            });

                            store.load({
                                params: {
                                    trainingId: me.getTrainingId(),
                                    assigned: false
                                }
                            });

                            me.window.show();
                        }
                    }
                }
            ]
        }
    ],

    window: null,

    added: function () {
        this.window.close();
        this.store.reload();
    },

    initComponent: function() {
        var me = this;
        me.addEvents(
            'removeattribute',
            'addattribute'
        );


        if (this.allowEdit) {
            this.on('itemcontextmenu', function(view, record, item, index, e) {
                e.stopEvent();

                if (!me.rowContextMenu) {
                    me.rowContextMenu = Ext.create('Ext.menu.Menu', {
                        items: [
                            {
                                text: 'Delete',
                                handler: function() {
                                    me.store.remove(me.rowContextMenu.record);
                                    var model = {
                                        trainingId: me.getTrainingId(),
                                        gradingAttributeId: me.rowContextMenu.record.get('id')
                                    };
                                    me.fireEvent('removeattribute', me, model);
                                }
                            }
                        ]
                    });
                }
                me.rowContextMenu.record = record;
                me.rowContextMenu.showAt(e.getXY());
            });
        } else {
            this.dockedItems = [];
        }

        this.store = Ext.create('Ilc.store.GradingAttributes');
        this.store.load({
            params: {
                trainingId: this.getTrainingId()
            }
        });

        this.callParent();
    }
});