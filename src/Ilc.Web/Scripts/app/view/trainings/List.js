Ext.define('Ilc.view.trainings.List', {
    extend: 'Ext.container.Container',
    

    constructor: function () {
        var me = this;

        var trainingsStore = Ext.create('Ext.data.Store', {
            fields: ['status', 'companyName', 'trainerName', 'subject', 'owners', 'startDate', 'endDate', 'students'],
            data: [
                {
                    status: 'Review', companyName: 'Google', trainerName: 'Gheo Ion', subject: 'English', owners: [{ id: 1, name: 'Ion' }, { id: 2, name: 'Gheo' }],
                    startDate: '2013-07-24', endDate: '2013-08-24',
                    students: [{ id: 1, name: 'Gheorghe Lazar', phone: '0723775755' }]
                }
            ]
        });

        var trainingsGrid = Ext.create('Ext.grid.Panel', {
            store: trainingsStore,
            columns: [
                {
                    dataIndex: 'status',
                    flex: 1,
                    text: 'Status'
                },
                {
                    dataIndex: 'companyName',
                    flex: 1,
                    text: 'Company'
                },
                {
                    dataIndex: 'trainerName',
                    flex: 1,
                    text: 'Trainer'
                },
                {
                    dataIndex: 'subject',
                    text: 'Subject',
                    flex: 1,
                },
                {
                    dataIndex: 'owners',
                    text: 'Owner',
                    flex: 1,
                    sortable: false,
                    renderer: function (value, metaData) {
                        metaData.tdAttr = 'data-entity="plm"';
                        var ret = '';
                        for (var i = 0; i < value.length; i++) {
                            var anchor = '<a>' + value[i].name + '</a>';
                            ret += anchor;
                        }
                        return ret;
                    }
                }
            ]
        });

        trainingsGrid.on('itemdblclick', function (grid, record) {
            var window = Ext.create('Ilc.view.trainings.View', {
                closeAction: 'destroy',
                modal: true,
                model: record.data
            });
            window.show();
        });

        me.items = [,
            {
                xtype: 'button',
                text: 'New training'
            },
            trainingsGrid
        ];

        me.callParent(arguments);
    }
});