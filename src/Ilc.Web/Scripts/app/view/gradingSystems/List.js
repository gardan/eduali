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
                        click: function () {
                            
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

    initComponent: function () {
        var me = this;

        var gradingSystemsStore = Ext.create('Ilc.store.TrainingSystems');

        me.store = gradingSystemsStore;

        me.on('itemdblclick', me.onItemDblClick);

        me.callParent(arguments);
        me.store.load();
    },
    
    destroy: function () {
        this.un('itemdblclick', this.onItemDblClick);

        this.callParent();
    }
});