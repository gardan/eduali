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
                    text: 'Name',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'phone',
                    text: 'Phone',
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
                            tooltip: 'Edit',
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
                            tooltip: 'Delete',
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
                text: 'New trainer',
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

        me.callParent(arguments);
    }
});