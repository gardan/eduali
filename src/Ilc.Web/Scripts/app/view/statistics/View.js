Ext.define('Ilc.view.statistics.View', {
    extend: 'Ext.container.Container',
    
    layout: {
        type: 'hbox', 
        align: 'stretch'
    },

    constructor: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['region', 'sales'],
            data: [
                { region: 'TM', sales: 10 },
                { region: 'CS', sales: 68 },
                { region: 'AR', sales: 27 },
                { region: 'OR', sales: 47 },
                { region: 'CJ', sales: 84 },
                { region: 'CJ', sales: 84 },
                { region: 'AR', sales: 27 },
                { region: 'OR', sales: 47 },
                { region: 'CJ', sales: 84 },
                { region: 'CJ', sales: 84 },
            ]
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            flex: 1,
            maxHeight: 400,
            store: store,
            axes: [
                {
                    title: 'Sales',
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['sales'],
                    minimum: 0
                },
                {
                    title: 'Regions',
                    type: 'Category',
                    position: 'left',
                    fields: ['region'],
                }
            ],
            
            series: [
                {
                    type: 'bar',
                    height: 100,
                    axis: 'bottom',
                    highlight: true,
                    xField: 'region',
                    yField: 'sales',
                    tips: {
                        trackMouse: true,
                        layout: 'fit',
                        items: [{xtype: 'label'}],
                        renderer: function (storeItem, item) {
                            this.down('label').setText(storeItem.get('region') + ': ' + storeItem.get('sales') + ' sales');
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