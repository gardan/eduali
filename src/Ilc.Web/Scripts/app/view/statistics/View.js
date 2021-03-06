﻿Ext.define('Ilc.view.statistics.View', {
    extend: 'Ext.container.Container',

    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

    requires: [
        'Ilc.view.statistics.Types',
        'Ilc.chart.Spendings',
        'Ilc.chart.Customers',
        'Ilc.chart.Trainings'
    ],

    style: {
        'background-color': 'white'
    },

    initComponent: function () {
        var me = this;

        var settingsContainer = Ext.create('Ext.panel.Panel', {
            title: '&nbsp;',
            flex: 1,
            autoScroll: true
        });

        me.items = [
            {
                xtype: 'statisticstypes',
                listeners: {
                    'leafselected': function (tree, record) {
                        switch (record.get('index')) {
                            case 1:
                                var spendingsStatsStore = Ext.create('Ilc.store.statistics.Spendings');
                                
                                spendingsStatsStore.load();

                                Ext.create('Ext.window.Window', {
                                    layout: 'anchor',
                                    width: 800,
                                    closeAction: 'destroy',
                                    modal: false,
                                    items: [
                                        {
                                            xtype: 'spendingschart',
                                            store: spendingsStatsStore,
                                        }
                                    ]
                                }).show();

                                break;
                            case 2:
                                var store = Ext.create('Ilc.store.statistics.Customers');
                                store.load({
                                    callback: function (records) {
                                        var max = 0;
                                        Ext.Array.forEach(records, function (recordInner) {
                                            if (recordInner.get('trainingsNo') > max) {
                                                max = recordInner.get('trainingsNo');
                                            }
                                        });

                                        if (max < 30) {
                                            max = 30;
                                        }

                                        var chart = Ext.create('Ilc.chart.Customers', {
                                            store: store,
                                            max: max
                                        });

                                        Ext.create('Ext.window.Window', {
                                            layout: 'anchor',
                                            width: 800,
                                            closeAction: 'destroy',
                                            modal: false,
                                            items: [
                                                chart
                                            ]
                                        }).show();

                                    }
                                });

                                break;
                            case 3:
                                
                                var subjectsStore = Ext.create('Ilc.store.Subjects');
                                subjectsStore.load({
                                    callback: function (records) {

                                        Ext.create('Ext.window.Window', {
                                            layout: 'anchor',
                                            width: 800,
                                            modal: false,
                                            closeAction: 'destroy',
                                            items: [
                                                {
                                                    xtype: 'trainingschart',
                                                    subjects: records
                                                }
                                            ]
                                        }).show();
                                    }
                                });
                                break;
                            default:
                        }
                    }
                }
            }
        ];

        me.callParent(arguments);
    }
});

//Ext.define('Ilc.view.statistics.View', {
//    extend: 'Ext.container.Container',
    
//    layout: 'anchor',

//    style: {
//        'background-color': 'white'
//    },

//    requires: [
//        'Ilc.chart.Spendings',
//        'Ilc.chart.Customers',
//        'Ilc.chart.Trainings'
//    ],

//    initComponent: function () {
//        var me = this;

//        var store = Ext.create('Ilc.store.statistics.Customers');

//        var spendingsStatsStore = Ext.create('Ilc.store.statistics.Spendings');

        
//        me.items = [
//            {
//                xtype: 'button',
//                text: 'Price / Spendings',
//                handler: function () {

//                    spendingsStatsStore.load();

//                    Ext.create('Ext.window.Window', {
//                        layout: 'anchor',
//                        width: 800,
//                        closeAction: 'destroy',
//                        modal: false,
//                        items: [
//                            {
//                                xtype: 'spendingschart',
//                                store: spendingsStatsStore,
//                            }
//                        ]
//                    }).show();

                    
//                },
//            },
//            {
//                xtype: 'button',
//                text: 'Customers purchases',
//                handler: function() {
//                    store.load({
//                        callback: function(records) {
//                            var max = 0;
//                            Ext.Array.forEach(records, function (record) {
//                                if (record.get('trainingsNo') > max) {
//                                    max = record.get('trainingsNo');
//                                }
//                            });

//                            if (max < 30) {
//                                max = 30;
//                            }

//                            var chart = Ext.create('Ilc.chart.Customers', {
//                                store: store,
//                                max: max
//                            });

//                            Ext.create('Ext.window.Window', {
//                                layout: 'anchor',
//                                width: 800,
//                                closeAction: 'destroy',
//                                modal: false,
//                                items: [
//                                    chart
//                                ]
//                            }).show();

//                        }
//                    });
//                }
//            },
//            {
//                xtype: 'button',
//                text: 'Trainings / Month',
//                handler: function () {
//                    var subjectsStore = Ext.create('Ilc.store.Subjects');
//                    subjectsStore.load({
//                        callback: function(records) {
                            
//                            Ext.create('Ext.window.Window', {
//                                layout: 'anchor',
//                                width: 800,
//                                modal: false,
//                                closeAction: 'destroy',
//                                items: [
//                                    {
//                                        xtype: 'trainingschart',
//                                        subjects: records
//                                    }
//                                ]
//                            }).show();
//                        }
//                    });

                    
//                }
//            }
//        ];

//        this.callParent(arguments);
//    }
//});