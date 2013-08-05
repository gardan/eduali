Ext.define('Ilc.view.trainers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listtrainers',

    constructor: function () {
        var me = this;

        var trainersStore = Ext.create('Ilc.store.Trainers');

        var trainersGrid = Ext.create('Ext.grid.Panel', {
            store: trainersStore,
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1
                },
                {
                    dataIndex: 'phone',
                    text: 'Phone',
                    flex: 1
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
            'editTrainer'
        );

        me.callParent(arguments);
    }
});