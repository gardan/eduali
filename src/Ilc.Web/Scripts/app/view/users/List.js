Ext.define('Ilc.view.users.List', {
    extend: 'Ext.container.Container',

    xtype: 'listusers',

    onDeleteFailure: function (model, operation) {
        switch (operation.error.status) {
            case 400:

                Ext.Msg.show({
                    title: 'Warning',
                    msg: operation.error.statusMessage,
                    buttons: Ext.Msg.OK,
                });

                break;
            default:
                console.log(arguments);
        }
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
                            
                            me.rowContextMenu.rec.destroy({
                                failure: function() {
                                    me.onDeleteFailure.apply(me, arguments);
                                },
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

        var usersStore = Ext.create('Ilc.store.Users');

        var usersGrid = Ext.create('Ilc.grid.Users', {
            store: usersStore,
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: usersStore,
                    dock: 'bottom'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.newUser'),
                            iconCls: 'icon-add',
                            cls: 'clean-button',
                            handler: function() {
                                var window = Ext.create('Ilc.view.users.Create', {
                                    listeners: {
                                        createuser: function(sender, model) {
                                            me.fireEvent('createuser', sender, model, {
                                                usersStore: usersStore
                                            });
                                        },
                                        useradded: function() {
                                            usersStore.reload();
                                        },
                                    }
                                });

                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        usersGrid.on('itemdblclick', function(grid, record) {
            var window = Ext.create('Ilc.view.users.Edit', {
                user: record,
                listeners: {
                    'useredited': function() {
                        usersStore.reload();
                    }
                }
            }).show();
        });

        usersGrid.on('itemcontextmenu', this.onItemContextMenu, this);

        me.items = [
            usersGrid
        ];

        usersStore.load();

        me.addEvents(
            'createuser'
        );

        me.callParent(arguments);
    }
});
