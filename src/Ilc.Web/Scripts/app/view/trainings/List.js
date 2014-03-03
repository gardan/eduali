﻿Ext.define('Ilc.view.trainings.List', {
    extend: 'Ext.container.Container',
    xtype: 'listtrainings',

    requires: [
        'Ilc.helpers.GridColumns'
    ],
    
    /*
        Object containing the querystrings    
    */
    params: {},
    
    init: function () {
        var me = this;
        var trainingsStore = Ext.create('Ilc.store.Trainings');

        var filters = {
            ftype: 'jsvfilters',
            // encode and local configuration options defined previously for easier reuse
            // encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
        };

        var trainingsGrid = Ext.create('Ext.grid.Panel', {
            store: trainingsStore,
            features: [filters],
            columns: Ilc.helpers.GridColumns.process([
                {
                    dataIndex: 'compositeId',
                    text: Ilc.resources.Manager.getResourceString('common.id'),
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'statusFriendlyName',
                    flex: 1,
                    text: Ilc.resources.Manager.getResourceString('common.status'),
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'customer',
                    flex: 1,
                    text: Ilc.resources.Manager.getResourceString('common.customer'),
                    renderer: function (value) {
                        return value.name;
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'trainer',
                    flex: 1,
                    text: Ilc.resources.Manager.getResourceString('common.trainer'),
                    renderer: function (value) {
                        return value.name;
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'subject',
                    text: Ilc.resources.Manager.getResourceString('common.subject'),
                    flex: 1,
                    renderer: function (value) {
                        return value.name;
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'desiredStartDate',
                    text: Ilc.resources.Manager.getResourceString('common.startDate'),
                    flex: 1,
                    renderer: function (value) {
                        return Ext.Date.format(new Date(value), 'Y-m-d');
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'price',
                    text: Ilc.resources.Manager.getResourceString('common.price'),
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'spendings',
                    text: 'Expenses',
                    flex: 1,
                    renderer: function (value) {
                        return value.trainer + value.supplies + value.transport;
                    },
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'owners',
                    text: Ilc.resources.Manager.getResourceString('common.owners'),
                    flex: 1,
                    sortable: false,
                    renderer: function (value, metaData) {
                        var ret = '';
                        for (var i = 0; i < value.length; i++) {
                            var anchor = '<a>' + value[i].username + '</a>,';
                            ret += anchor;
                        }
                        return ret.slice(0, ret.length - 1);
                    }
                }
            ], 'trainings'),
            tbar: {
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'icon-add',
                        text: Ilc.resources.Manager.getResourceString('common.newTraining'),
                        handler: function (btn, e) {
                            var window = Ext.create('Ilc.view.trainings.Create', {
                                modal: true,
                                closeAction: 'destroy'
                            });

                            window.on('addTraining', function (sender, data) {
                                me.fireEvent('addTraining', sender, data, {
                                    store: trainingsStore
                                });
                            });
                            window.show();
                        }
                    }
                ]
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: trainingsStore,
                    dock: 'bottom'
                }
            ]
        });

        trainingsGrid.on('itemdblclick', function (grid, record) {
            var window = Ext.create('Ilc.view.trainings.View', {
                closeAction: 'destroy',
                modal: true,
                model: record
            });

            // window.on('updatetraining', function (sender, args) {
            //     me.fireEvent('updatetraining', sender, args);
            // });

            window.on('trainingupdated', function () {
                console.log('trainingupdated');
                trainingsStore.reload();
            });

            window.show();
        });

        // update the columns if they change
        trainingsGrid.on('columnhide', function (headerContainer) {
            // debugger;
            console.log('hidden!!!');
            Ilc.helpers.GridColumns.updateColumns(headerContainer, 'trainings');
        });
        trainingsGrid.on('columnshow', function (headerContainer) {
            // debugger;
            console.log('shown!!!');
            Ilc.helpers.GridColumns.updateColumns(headerContainer, 'trainings');
        });
        trainingsGrid.on('columnmove', function (headerContainer) {
            // debugger;
            console.log('moved!!!');
            Ilc.helpers.GridColumns.updateColumns(headerContainer, 'trainings');
        });

        me.items = [
            trainingsGrid
        ];
    },
    initOpen: function() {
        var me = this;
        
        var trainingsStore = Ext.create('Ilc.store.Trainings');

        var filters = {
            ftype: 'jsvfilters',
            // encode and local configuration options defined previously for easier reuse
            // encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
        };

        var trainingsGrid = Ext.create('Ext.grid.Panel', {
            features: [filters],
            store: trainingsStore,
            columns: [
                {
                    dataIndex: 'subject',
                    text: Ilc.resources.Manager.getResourceString('common.subject'),
                    flex: 1,
                    renderer: function (value) {
                        return value.name;
                    },
                    filter: {
                        type: 'string'
                    }
                }
            ]
        });

        trainingsStore.load({
            params: {
                open: true
            }
        });

        me.items = [
            trainingsGrid
        ];
    },

    initComponent: function () {
        var me = this;

        if (me.params.open === undefined || me.params.open === 'false') {
            me.init();
        } else {
            me.initOpen();
        }


        me.addEvents(
            'addTraining',
            'updatetraining'
        );

        me.callParent(arguments);
    }
});