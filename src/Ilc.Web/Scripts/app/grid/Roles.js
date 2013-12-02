Ext.define('Ilc.grid.Roles', {
    extend: 'Ext.grid.Panel',
    
    initComponent: function() {
        var me = this;

        me.columns = [
            {
                text: Ilc.resources.Manager.getResourceString('common.name'),
                dataIndex: 'name',
                flex: 1
            },
            {
                xtype: 'actioncolumn',
                sortable: false,
                menuDisabled: true,
                items: [
                    {
                        icon: 'images/web/remove.png',
                        tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                        handler: function(grid, rowIndex, colIndex, item, e, record) {
                            me.fireEvent('delete', me, record);
                        }
                    }
                ]
            }
        ];

        me.addEvents('delete');

        me.callParent(arguments);
    }
});