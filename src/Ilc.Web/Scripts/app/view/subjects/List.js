Ext.define('Ilc.view.subjects.List', {
    extend: 'Ext.container.Container',
    xtype: 'listsubjectswindow',

    onDeleteFailure: function(model, operation) {
        switch (operation.error.status) {
            case 400:
                
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Subject belongs to one or more trainers, please remove them then try again.',
                    buttons: Ext.Msg.OK,
                });

                break;
            default:
                console.log(arguments);
        }
    },

    initComponent: function () {
        var me = this;

        var subjectsStore = Ext.create('Ilc.store.Subjects');

        var subjectsGrid = Ext.create('Ext.grid.Panel', {
            store: subjectsStore,
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
                            scope: me,
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                record.destroy({
                                    success: function() {
                                        console.log(arguments);
                                    },
                                    failure: function(model, response) {
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
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.newSubject'),
                            iconCls: 'icon-add',
                            cls: 'clean-button',
                            handler: function() {
                                var window = Ext.create('Ilc.view.subjects.Create', {
                                    closeAction: 'destroy'
                                });

                                window.on('addsubject', function (sender, model) {
                                    me.fireEvent('addsubject', sender, model, {
                                        store: subjectsStore
                                    });
                                });

                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        subjectsGrid.on('itemdblclick', function(grid, record) {
            var window = Ext.create('Ilc.view.subjects.Edit', {
                subject: record
            }).show();

            window.on('editcomplete', function() {
                subjectsStore.load();
            });
        });

        subjectsGrid.on('itemcontextmenu', function (view, record, item, index, e) {
            e.stopEvent();

            if (!subjectsGrid.rowContextMenu) {
                subjectsGrid.rowContextMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function () {
                                subjectsGrid.rowContextMenu.rec.destroy({
                                    failure: function() {
                                        me.onDeleteFailure.apply(me, arguments);
                                    },
                                });
                                

                            }
                        }
                    ]
                });
            }

            subjectsGrid.rowContextMenu.rec = record;
            subjectsGrid.rowContextMenu.showAt(e.getXY());
        });

        this.items = [
            subjectsGrid
        ];

        subjectsStore.load();

        this.addEvents(
            'addsubject'
        );

        this.callParent(arguments);
    }

});