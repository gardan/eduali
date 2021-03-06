﻿Ext.define('Ilc.grid.Grades', {
    extend: 'Ext.grid.Panel',
    
    requires: [
        'Ilc.model.Grade'
    ],
    
    minHeight: 130,

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorganize'
        },
        listeners: {
            drop: function (node, data, dropRec, dropPosition) {
                var grid = data.view;
                
                grid.store.each(function (record) {
                    var index = grid.store.indexOf(record);

                    record.set('order', index + 1);
                    record.commit();
                });
            }
        }
    },
    
    initComponent: function() {
        var me = this;

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clickstoedit: 2,
            autoCancel: false
        });
        
        var textField = {
            xtype: 'textfield'
        };

        me.plugins = [rowEditing];

        me.columns = [
            {
                text: 'Grade name',
                dataIndex: 'name',
                editor: textField,
                flex: 1
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        text: 'Add grade',
                        handler: function () {
                            var newGrade = Ext.create('Ilc.model.Grade');
                            
                            me.store.insert(0, newGrade);
                            rowEditing.startEdit(0, 0);
                        }
                    }
                ],
            }
        ];

        me.on('itemcontextmenu', function(view, record, item, index, e) {
            e.stopEvent();

            if (!me.rowContextMenu) {
                me.rowContextMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            text: 'New grade',
                            handler: function() {
                                var selected = me.selModel.getSelection();

                                rowEditing.cancelEdit();
                                var newGrade = Ext.create('Ilc.model.Grade');
                                me.store.insert(index, newGrade);
                                rowEditing.startEdit(selected[0].index, 0);
                            }
                        },
                        {
                            text: 'Delete',
                            handler: function() {
                                var selected = me.selModel.getSelection();
                                Ext.MessageBox.confirm(
                                    'Confirm delete',
                                    'Are you sure?',
                                    function(btn) {
                                        if (btn == 'yes') {
                                            me.store.remove(selected[0]);
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

        me.callParent(arguments);
    }
});