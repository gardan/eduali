Ext.define('Ilc.view.statistics.View', {
    extend: 'Ext.container.Container',
    
    layout: 'fit',

    constructor: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['temperature', 'region'],
            data: [
                { temperature: 58, region: 'TM' },
                { temperature: 63, region: 'CS' },
                { temperature: 73, region: 'AR' },
                { temperature: 78, region: 'OR' },
                { temperature: 81, region: 'CJ' }
            ]
        });

        var chart = Ext.create('Ext.chart.Chart', {
            store: store,
            
            axes: [
                {
                    title: 'Temperature',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['temperature'],
                    minimum: 0,
                    maximum: 100
                },
                {
                    title: 'Time',
                    type: 'Category',
                    position: 'bottom',
                    fields: ['region']
                }
            ],
            
            series: [
                {
                    type: 'column',
                    xField: 'region',
                    yField: 'temperature'
                }
            ]
        });


        this.items = [
            chart
        ];

        this.callParent(arguments);
    }
});