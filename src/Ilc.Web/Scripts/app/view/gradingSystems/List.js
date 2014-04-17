Ext.define('Ilc.view.gradingSystems.List', {
    extend: 'Ext.grid.Panel',
    
    columns: [
        {
            dataIndex: 'id',
            text: Ilc.resources.Manager.getResourceString('common.id'),
            
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'name',
            text: Ilc.resources.Manager.getResourceString('common.name'),
            flex: 1,
            filter: {
                type: 'string'
            }
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Create new system',
                    listeners: {
                        click: function (btn) {
                            var me = btn.up('grid');
                            var newGradingSystem = Ext.create('Ilc.model.GradingSystem', {
                                name: 'New grading system'
                            });

                            newGradingSystem.save({
                                success: function () {

                                    me.store.reload();
                                }
                            });
                            
                        }
                    }
                }
            ],
        }
    ],

    onItemDblClick: function (grid, record) {
        var me = this;
        var window = Ext.create('Ilc.view.gradingSystems.Edit', {
            gradingSystem: record,
            listeners: {
                'afterupdate': function() {
                    me.store.reload();
                }
            }
        });

        window.show();
    },

    onItemContextMenu: function (view, record, item, index, e) {
        var me = this;
        e.stopEvent();

        if (!me.rowContextMenu) {
            me.rowContextMenu = Ext.create('Ext.menu.Menu', {
                items: [
                    {
                        text: Ilc.resources.Manager.getResourceString('common.delete'),
                        handler: function () {
                            me.store.remove(me.rowContextMenu.rec);
                            me.rowContextMenu.rec.destroy({
                                failure: function() {
                                    console.log(arguments);
                                }
                            });
                        }
                    }
                ]
            });
        }

        me.rowContextMenu.rec = record;
        me.rowContextMenu.showAt(e.getXY());
    },

    initComponent: function () {
        var me = this;

        var gradingSystemsStore = Ext.create('Ilc.store.TrainingSystems');

        me.store = gradingSystemsStore;

        me.on('itemdblclick', me.onItemDblClick);
        me.on('itemcontextmenu', me.onItemContextMenu, this);

        me.callParent(arguments);
        me.store.load();
    },
    
    destroy: function () {
        this.un('itemdblclick', this.onItemDblClick);

        this.callParent();
    }
});