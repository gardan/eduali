Ext.define('Ilc.chart.Trainings', {
    extend: 'Ext.chart.Chart',
    xtype: 'trainingschart',
    anchor: '100%',
    height: 500,
    legend: {
        position: 'right'
    },
    axes: [
        {
            position: 'left',
            type: 'Numeric',
            fields: ['english', 'french'],
            title: 'No. of trainings'
        },
        {
            position: 'bottom',
            type: 'Category',
            fields: ['month'],
            title: 'Year'
        }
    ],

    series: [
        {
            type: 'line',
            axis: 'left',
            xField: 'month',
            yField: ['english']
        },
        {
            type: 'line',
            axis: 'left',
            xField: 'month',
            yField: ['french']
        }
    ],
});