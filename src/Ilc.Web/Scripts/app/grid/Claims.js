Ext.define('Ilc.grid.Claims', {
    extend: 'Ext.grid.Panel',

    columns: [
        {
            text: Ilc.resources.Manager.getResourceString('common.name'),
            dataIndex: 'name',
            flex: 1
        }
    ],

    onRemoveFailure: function() {
        console.log(arguments);
    },

    onItemContextMenu: function (view, record, item, index, e) {
        var me = this;
        e.stopEvent();

        var deleteUrl = 'api/roles/{roleId}/claims/';
        deleteUrl = deleteUrl.replace('{roleId}', me.store.roleId);

        if (!me.rowContextMenu) {
            me.rowContextMenu = Ext.create('Ext.menu.Menu', {
                items: [
                    {
                        text: Ilc.resources.Manager.getResourceString('common.delete'),
                        handler: function () {
                            me.store.remove(me.rowContextMenu.rec);
                            me.rowContextMenu.rec.destroy({
                                failure: me.onRemoveFailure,
                                url: deleteUrl
                            });
                        }
                    }
                ]
            });
        }

        me.rowContextMenu.rec = record;
        me.rowContextMenu.showAt(e.getXY());
    },

    initComponent: function() {
        var me = this;

        me.on('itemcontextmenu', me.onItemContextMenu, this);

        me.callParent(arguments);
    }
});