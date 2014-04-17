Ext.define('Ilc.grid.Roles', {
    extend: 'Ext.grid.Panel',
    
    onDeleteSuccess: function () {
        console.log(arguments);
    },
    
    onDeleteFailure: function(model, operation) {

    },

    _initColumns: function() {
        var me = this;
        return [
            {
                text: Ilc.resources.Manager.getResourceString('common.name'),
                dataIndex: 'name',
                flex: 1
            },
            {
                xtype: 'actioncolumn',
                text: Ilc.resources.Manager.getResourceString('common.actions'),
                sortable: false,
                menuDisabled: true,
                items: [
                    {
                        icon: 'images/web/remove.png',
                        tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                        handler: function (grid, rowIndex, colIndex, item, e, record) {
                            record.destroy({
                                success: me.onDeleteSuccess,
                                failure: me.onDeleteFailure
                            });
                        }
                    }
                ]
            }
        ];
    },

    initComponent: function() {
        var me = this;
        me.addEvents('delete');

        me.columns = this._initColumns();

        me.callParent(arguments);
    }
});