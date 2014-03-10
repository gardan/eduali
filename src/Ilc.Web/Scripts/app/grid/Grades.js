Ext.define('Ilc.grid.Grades', {
    extend: 'Ext.grid.Panel',
    
    columns: [
        {
            text: Ilc.resources.Manager.getResourceString('common.name'),
            dataIndex: 'name'
        }
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
                    record.save();
                });
            }
        }
    }
});