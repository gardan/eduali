Ext.define('Ilc.view.gradingAttributes.List', {
    extend: 'Ext.grid.Panel',
    
    config: {
        gradingSystemId: null
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Add attribute',
                    listeners: {
                        click: function() {
                            var me = this.up('grid');
                            
                            me.rowEditing.cancelEdit();
                            var newAttribute = Ext.create('Ilc.model.GradingAttribute', {
                                gradingSystemId: me.gradingSystemId
                            });
                            newAttribute.save({
                                success: function (attribute, operation) {
                                    me.fireEvent('afterupdate');
                                    var createdAttribute = Ext.JSON.decode(operation.response.responseText);
                                    newAttribute.set('id', createdAttribute.id);
                                    me.store.insert(0, newAttribute);
                                    me.rowEditing.startEdit(0, 0);
                                }
                            });
                        }
                    }
                }
            ]
        }
    ],

    initComponent: function () {
        this.addEvents(
            'afterupdate'
        );

        var me = this;

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clickstoedit: 2,
            autoCancel: false
        });

        me.rowEditing = rowEditing;

        var textField = {
            xtype: 'textfield'
        };

        me.plugins = [rowEditing];

        me.columns = [
            {
                dataIndex: 'name',
                title: 'Name',
                flex: 1,
                editor: textField
            }
        ];

        me.on('edit', function (editor, e) {
            var record = e.record;
            record.save({
                success: function () {
                    record.commit();
                    me.fireEvent('afterupdate');
                }
            });
        }, this);

        me.on('itemcontextmenu', function (view, record, item, index, e) {
            e.stopEvent();

            if (!me.rowContextMenu) {
                me.rowContextMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            text: 'New attribute',
                            handler: function () {
                                var selected = me.selModel.getSelection();
                                rowEditing.cancelEdit();
                                var newAttribute = Ext.create('Ilc.model.GradingAttribute', {
                                    gradingSystemId: me.gradingSystemId
                                });
                                newAttribute.save({
                                    success: function (attribute, operation) {
                                        me.fireEvent('afterupdate');
                                        var createdAttribute = Ext.JSON.decode(operation.response.responseText);
                                        newAttribute.set('id', createdAttribute.id);
                                        me.store.insert(index, newAttribute);
                                        rowEditing.startEdit(selected[0].index, 0);
                                    }
                                });

                                
                            }
                        },
                        {
                            text: 'Delete',
                            handler: function () {
                                var selected = me.selModel.getSelection();
                                Ext.MessageBox.confirm(
                                    'Confirm delete',
                                    'Are you sure?',
                                    function (btn) {
                                        if (btn == 'yes') {
                                            // var record = selected[0];
                                            me.store.remove(selected[0]);
                                            selected[0].destroy({
                                                success: function() {
                                                    me.fireEvent('afterupdate');
                                                }
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    ]
                });
            }

            me.rowContextMenu.showAt(e.getXY());
        });

        this.callParent(arguments);
    }
});