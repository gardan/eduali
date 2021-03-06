﻿Ext.define('Ilc.view.trainers.List', {
    extend: 'Ext.container.Container',
    xtype: 'listtrainers',

    requires: [
        'Ilc.AsyncHelpers'
    ],

    trainersStore: null,

    initColumns: function() {
        var me = this;

        var ret = [
            {
                // TODO: should actually use 'templatecolumn' and a XTemplate to create the <img /> tag.
                dataIndex: 'name',
                text: Ilc.resources.Manager.getResourceString('common.avatar'),
                renderer: function(value, meta, record) {
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
                dataIndex: 'subjectNames',
                text: Ilc.resources.Manager.getResourceString('common.subjects'),
                flex: 1,
                renderer: function(value) {
                    //var ret = '';
                    //Ext.Array.forEach(value, function(subject) {
                    //    ret += subject.name + ', ';
                    //});
                    //return ret.substring(0, ret.length - 2);

                    return value;
                },
                filter: {
                    type: 'string'
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
                        Ilc.AsyncHelpers.confirmModal()
                            .then(function() {
                                me.fireEvent('deleteTrainer', me, {
                                        id: record.data.id
                                    }, {
                                        store: me.trainersStore
                                    });
                            });
                    }
                }
            ]
        });

        return ret;
    },

    showError: function(error) {
        Ext.MessageBox.show({
            msg: error.responseStatus.message,
            buttons: Ext.Msg.OK
        });
    },

    initComponent: function () {

        var me = this;

        var trainersStore = Ext.create('Ilc.store.Trainers');

        me.trainersStore = trainersStore;

        var filter = {
            ftype: 'jsvfilters',
            local: false
        };

        var trainersGrid = Ext.create('Ext.grid.Panel', {
            store: me.trainersStore,
            features: [filter],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: trainersStore,
                    dock: 'bottom',
                    displayInfo: true,
                    displayMsg: 'Displaying trainers {0} - {1} of {2}'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-add',
                            cls: 'clean-button',
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