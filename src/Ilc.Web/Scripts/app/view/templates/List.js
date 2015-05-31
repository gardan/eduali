Ext.define('Ilc.view.templates.List', {
    extend: 'Ext.container.Container',
    xtype: 'templateslist',

    initComponent: function() {
        var me = this;

        var templatesStore = Ext.create('Ilc.store.Templates');

        var templatesGrid = Ext.create('Ext.grid.Panel', {
            columns: [
                {
                    dataIndex: 'name',
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    items: [
                        {
                            icon: 'images/web/remove.png',
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                record.destroy({
                                    success: function () {
                                        console.log(arguments);
                                    },
                                    failure: function (model, response) {
                                        Ext.MessageBox.show({
                                            title: 'Error',
                                            msg: response.error.statusText,
                                            buttons: Ext.MessageBox.OK,
                                        });
                                    }
                                });
                            }
                        }
                    ]
                }
            ],
            store: templatesStore,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.newTemplate'),
                            iconCls: 'icon-add',
                            cls: 'clean-button',
                            handler: function () {
                                var window = Ext.create('Ilc.view.templates.Create', {
                                    closeAction: 'destroy'
                                });

                                window.on('templateadded', function () {
                                    templatesStore.reload();
                                });

                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        templatesGrid.on('itemdblclick', function(grid, record) {
            var window = Ext.create('Ilc.view.templates.Edit', {
                template: record,
                listeners: {
                    templatededited: function() {
                        templatesStore.reload();
                    }
                }
            });

            window.show();
        });

        templatesGrid.on('itemcontextmenu', function(view, record, item, index, e) {
            e.stopEvent();

            if (!templatesGrid.rowContextMenu) {
                templatesGrid.rowContextMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function() {
                                templatesGrid.rowContextMenu.rec.destroy({
                                    failure: function() {
                                        console.log(arguments);
                                    }
                                });
                            }
                        }
                    ]
                });
            }

            templatesGrid.rowContextMenu.rec = record;
            templatesGrid.rowContextMenu.showAt(e.getXY());
        });

        me.items = [
            templatesGrid
        ];

        templatesStore.load();
        me.callParent(arguments);
    }
});