Ext.define('Ilc.grid.Grades', {
    extend: 'Ext.grid.Panel',
    
    requires: [
        'Ilc.model.Grade'
    ],
    
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
                text: Ilc.resources.Manager.getResourceString('common.name'),
                dataIndex: 'name',
                editor: textField
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
                                debugger;
                                me.store.insert(index, newGrade);
                                rowEditing.startEdit(selected[0].index, 0);
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