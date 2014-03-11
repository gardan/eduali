Ext.define('Ilc.grid.Grades', {
    extend: 'Ext.grid.Panel',
    
    
    
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
                    record.save();
                });
            }
        }
    },
    
    initComponent: function() {
        var me = this;

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clickstoedit: 2,
            autoCancel: false,
            listeners: {
                edit: function (editor, e) {
                    var rec = e.record;

                    var model = {
                        id: rec.get('Id'),
                        trainingId: me.training.get('id'),
                        startDate: rec.get('StartDate'),
                        endDate: rec.get('EndDate'),
                        lessonName: rec.get('Name'),
                    };

                    me.fireEvent('editlesson', me, model);
                }
            }
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

        me.callParent(arguments);
    }
});