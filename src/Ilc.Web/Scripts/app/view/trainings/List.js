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
                    text: Ilc.resources.Manager.getResourceString('common.status')
                },
                {
                    dataIndex: 'customer',
                    flex: 1,
                    text: Ilc.resources.Manager.getResourceString('common.customer'),
                    renderer: function(value) {
                        return value.name;
                    }
                },
                {
                    dataIndex: 'trainer',
                    flex: 1,
                    text: Ilc.resources.Manager.getResourceString('common.trainer'),
                    renderer: function(value) {
                        return value.name;
                    }
                },
                {
                    dataIndex: 'subject',
                    text: Ilc.resources.Manager.getResourceString('common.subject'),
                    flex: 1,
                    renderer: function(value) {
                        return value.name;
                    }
                },
                {
                    dataIndex: 'owners',
                    text: Ilc.resources.Manager.getResourceString('common.owners'),
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

        me.items = [,
            {
                xtype: 'button',
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
            },
            trainingsGrid
        ];

        me.addEvents(
            'addTraining'
        );

        me.callParent(arguments);
    },
});