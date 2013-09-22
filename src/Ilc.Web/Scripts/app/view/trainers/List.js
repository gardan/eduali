Ext.define('Ilc.view.trainers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listtrainers',

    constructor: function () {
        var me = this;

        var trainersStore = Ext.create('Ilc.store.Trainers');

        var filter = {
            ftype: 'jsvfilters',
            local: false
        };

        var trainersGrid = Ext.create('Ext.grid.Panel', {
            store: trainersStore,
            features: [filter],
            columns: [
                {
                    dataIndex: 'name',
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'phone',
                    text: Ilc.resources.Manager.getResourceString('common.phone'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    sortable: false,
                    menuDisabled: true,
                    items: [
                        {
                            icon: 'images/web/edit.png',
                            scope: me,
                            tooltip: Ilc.resources.Manager.getResourceString('common.edit'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                var editWindow = Ext.create('Ilc.view.trainers.Edit', {
                                    closeAction: 'destroy',
                                    model: record.data
                                });

                                editWindow.on('editTrainer', function (sender, model) {
                                    me.fireEvent('editTrainer', sender, model, {
                                        store: trainersStore
                                    });
                                });

                                editWindow.show();
                            }
                        },
                        {
                            icon: 'images/web/remove.png',
                            scope: me,
                            tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                me.fireEvent('deleteTrainer', me, {
                                    id: record.data.id
                                }, {
                                    store: trainersStore
                                });
                            }
                        }
                    ]
                }
            ]
        });

        me.items = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.newTrainer'),
                handler: function (button, e) {
                    var window = Ext.create('Ilc.view.trainers.Create', {
                        closeAction: 'destroy'
                    });

                    window.on('addTrainer', function (sender, model) {
                        me.fireEvent('addTrainer', sender, model, {
                            store: trainersStore
                        });
                    });

                    window.show();
                }
            },
            trainersGrid
        ];

        me.addEvents(
            'addTrainer',
            'editTrainer',
            'deleteTrainer'
        );

        trainersStore.load();

        me.callParent(arguments);
    }
});