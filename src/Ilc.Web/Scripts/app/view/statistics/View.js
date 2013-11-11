Ext.define('Ilc.view.statistics.View', {
    extend: 'Ext.container.Container',
    
    layout: {
        type: 'hbox', 
        align: 'stretch'
    },

    style: {
        'background-color': 'white'
    },

    constructor: function () {
        var me = this;

        var store = Ext.create('Ilc.store.statistics.Customers');

        store.on('load', function (statsStore, records) {
            var max = 0;
            Ext.Array.forEach(records, function(record) {
                if (record.get('trainingsNo') > max) {
                    max = record.get('trainingsNo');
                }
            });

            if (max < 30) {
                max = 30;
            }

            var chart = Ext.create('Ext.chart.Chart', {
                animate: true,
                shadow: true,
                flex: 1,
                maxHeight: 400,
                store: store,
                axes: [
                    {
                        title: 'Trainigs',
                        type: 'Numeric',
                        position: 'bottom',
                        fields: ['trainingsNo'],
                        minimum: 0,
                        maximum: max
                    },
                    {
                        title: 'Customers',
                        type: 'Category',
                        position: 'left',
                        fields: ['name'],
                    }
                ],

                series: [
                    {
                        type: 'bar',
                        height: 100,
                        axis: 'bottom',
                        highlight: true,
                        xField: 'name',
                        yField: 'trainingsNo',
                        tips: {
                            trackMouse: true,
                            layout: 'fit',
                            items: [{ xtype: 'label' }],
                            renderer: function (storeItem, item) {
                                this.down('label').setText(storeItem.get('name') + ': ' + storeItem.get('trainingsNo') + ' Trainings');
                            }
                        }
                    }
                ]
            });

            me.add(chart);

        });

        // this.items = [
        //     chart
        // ];

        store.load();

        this.callParent(arguments);
    }
});