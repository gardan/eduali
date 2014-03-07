Ext.define('Ilc.view.trainers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listtrainers',

    trainersStore: null,

    initColumns: function () {
        var me = this;

        var ret = [
            {
                // TODO: should actually use 'templatecolumn' and a XTemplate to create the <img /> tag.
                dataIndex: 'name',
                text: Ilc.resources.Manager.getResourceString('common.avatar'),
                renderer: function (value, meta, record) {
                    var avatarUrl = record.get('userInfo').avatarLocation;
                    return '<img width="64" height="64" src="' + avatarUrl + '" />';
                }
            },
            {
                dataIndex: 'name',
                text: Ilc.resources.Manager.getResourceString('common.name'),
                flex: 1,
                filter: {
                    type: 'string'
                }
            },
            {
                dataIndex: 'subjects',
                text: Ilc.resources.Manager.getResourceString('common.subjects'),
                flex: 1,
                renderer: function (value) {
                    var ret = '';
                    Ext.Array.forEach(value, function (subject) {
                        ret += subject.name + ', ';
                    });
                    return ret.substring(0, ret.length - 2);
                }
            }
        ];

        ret = ret.concat(Ilc.helpers.ColumnBuilder.getUserColCfg());

        ret.push({
            xtype: 'actioncolumn',
            text: Ilc.resources.Manager.getResourceString('common.actions'),
            sortable: false,
            menuDisabled: true,
            items: [
                {
                    icon: 'images/web/remove.png',
                    scope: me,
                    tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                    handler: function (grid, rowIndex, colIndex, item, e, record) {
                        me.fireEvent('deleteTrainer', me, {
                            id: record.data.id
                        }, {
                            store: me.trainersStore
                        });
                    }
                }
            ]
        });
        
        return ret;
    },

    initComponent: function () {
        var me = this;

        me.trainersStore = Ext.create('Ilc.store.Trainers');

        var filter = {
            ftype: 'jsvfilters',
            local: false
        };

        var trainersGrid = Ext.create('Ext.grid.Panel', {
            store: me.trainersStore,
            features: [filter],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-add',
                            text: Ilc.resources.Manager.getResourceString('common.newTrainer'),
                            handler: function (button, e) {
                                var window = Ext.create('Ilc.view.trainers.Create', {
                                    closeAction: 'destroy'
                                });

                                window.on('addTrainer', function (sender, model) {
                                    me.fireEvent('addTrainer', sender, model, {
                                        store: me.trainersStore
                                    });
                                });

                                window.on('traineradded', function() {
                                    me.trainersStore.reload();
                                });

                                window.show();
                            }
                        }]
                }
            ],
            columns: me.initColumns()
        });

        trainersGrid.on('itemdblclick', function(grid, record) {
            var editWindow = Ext.create('Ilc.view.trainers.Edit', {
                closeAction: 'destroy',
                model: record.data
            });

            editWindow.on('editTrainer', function (sender, model) {
                me.fireEvent('editTrainer', sender, model, {
                    store: me.trainersStore
                });
            });

            editWindow.on('traineredited', function() {
                me.trainersStore.reload();
            });

            editWindow.show();
        });

        me.items = [
            trainersGrid
        ];

        me.addEvents(
            'addTrainer',
            'editTrainer',
            'deleteTrainer'
        );

        me.trainersStore.load();

        me.callParent(arguments);
    }
});