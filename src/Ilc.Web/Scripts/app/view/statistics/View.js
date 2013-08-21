Ext.define('Ilc.view.statistics.View', {
    extend: 'Ext.container.Container',
    
    layout: {
        type: 'hbox', 
        align: 'stretch'
    },

    constructor: function () {
        var store = Ext.create('Ilc.store.statistics.Customers');

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
                    minimum: 0
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
                        items: [{xtype: 'label'}],
                        renderer: function (storeItem, item) {
                            this.down('label').setText(storeItem.get('name') + ': ' + storeItem.get('trainingsNo') + ' Trainings');
                        }
                    }
                }
            ]
        });


        this.items = [
            chart
        ];

        this.callParent(arguments);
    }
});