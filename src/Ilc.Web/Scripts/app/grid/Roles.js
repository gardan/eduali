Ext.define('Ilc.grid.Roles', {
    extend: 'Ext.grid.Panel',
    xtype: 'rolesgrid',

    onDeleteSuccess: function () {
        console.log(arguments);
    },
    
    onDeleteFailure: function(model, operation) {
        
        switch (operation.error.status) {
            case 400: // Role belongs to some user, if we really want to delete, use the 'Force' parameter
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'This role belongs to one or more users. Deleting this role would result on those users losing their rights. Would you like to continue anyway?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (buttonId) {
                        if (buttonId == 'yes') {
                            var grid = Ext.ComponentQuery.query('rolesgrid')[0];

                            model.destroy({
                                success: grid.onDeleteSuccess,
                                failure: grid.onDeleteFailure,
                                params: {
                                    force: true
                                }
                            });
                        }
                    }
                });
                break;
            case 405: // Role has CanDelete == false.
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'This role cannot be deleted.',
                    buttons: Ext.Msg.OK,
                });
                break;
            default:
                console.log(arguments);
                break;
        }
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