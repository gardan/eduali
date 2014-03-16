Ext.define('Ilc.grid.SubjectFiles', {
    extend: 'Ext.grid.Panel',
    xtype: 'subjectfilesgrid',

    columns: [
        {
            dataIndex: 'filename',
            text: 'Filename',
            flex: 1
        },
        {
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        },
        {
            dataIndex: 'creator',
            text: 'Creator',
            renderer: function(value) {
                return value.userInfo.name;
            },
            flex: 1
        },
        {
            dataIndex: 'createDate',
            text: 'Created at',
            flex: 1
        }
    ],
    
    contextMenu: null,

    initContextMenu: function() {
        var me = this;
        return Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'Delete',
                    handler: function() {
                        var model = {
                            id: me.contextMenu.record.get('id')
                        };
                        me.fireEvent('removefile', me, model);
                    }
                }
            ]
        });
    },

    onItemContextMenu: function (grid, record, item, index, e, eOpts) {
        e.stopEvent();
        
        if (grid.contextMenu == null) {
            this.contextMenu = this.initContextMenu();
        }
        this.contextMenu.record = record;
        this.contextMenu.showAt(e.getXY());
    },

    initComponent: function () {

        this.addEvents(
            'removefile'
        );

        this.on('itemcontextmenu', this.onItemContextMenu);

        this.callParent();
    },
    
    fileDeleted: function() {
        this.store.reload();
    }
});