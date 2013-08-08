Ext.define('Ilc.view.trainings.List', {
    extend: 'Ext.container.Container',
    xtype: 'listtrainings',

    requires: [
        'Ilc.helpers.GridColumns'
    ],

    constructor: function () {
        var me = this;

        var trainingsStore = Ext.create('Ilc.store.Trainings');

        var trainingsGrid = Ext.create('Ext.grid.Panel', {
            store: trainingsStore,
            columns: Ilc.helpers.GridColumns.process([
                {
                    dataIndex: 'status',
                    flex: 1,
                    text: 'Status'
                },
                {
                    dataIndex: 'customer',
                    flex: 1,
                    text: 'Customer',
                    renderer: function(value) {
                        return value.name;
                    }
                },
                {
                    dataIndex: 'trainer',
                    flex: 1,
                    text: 'Trainer',
                    renderer: function(value) {
                        return value.name;
                    }
                },
                {
                    dataIndex: 'subject',
                    text: 'Subject',
                    flex: 1,
                    renderer: function(value) {
                        return value.name;
                    }
                },
                {
                    dataIndex: 'owners',
                    text: 'Owner',
                    flex: 1,
                    sortable: false,
                    renderer: function(value, metaData) {
                        var ret = '';
                        for (var i = 0; i < value.length; i++) {
                            var anchor = '<a>' + value[i].username + '</a>,';
                            ret += anchor;
                        }
                        return ret.slice(0, ret.length - 1);
                    }
                }
            ], 'trainings')
        });

        trainingsGrid.on('itemdblclick', function (grid, record) {
            var window = Ext.create('Ilc.view.trainings.View', {
                closeAction: 'destroy',
                modal: true,
                model: record.data
            });
            window.show();
        });

        trainingsGrid.on('columnschanged', function (headerContainer) {
            // debugger;
            console.log('fire!!!');
        });

        me.items = [,
            {
                xtype: 'button',
                text: 'New training',
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
            },
            trainingsGrid
        ];

        me.addEvents(
            'addTraining'
        );

        me.callParent(arguments);
    },
});