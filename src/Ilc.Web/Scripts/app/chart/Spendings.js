Ext.define('Ilc.chart.Spendings', {
    extend: 'Ext.chart.Chart',
    xtype: 'spendingschart',
    anchor: '100%',
    height: 500,
    legend: {
        position: 'right'
    },
    axes: [
        {
            position: 'bottom',
            type: 'Numeric',
            fields: ['price', 'spendings'],
            title: 'Money'
        },
        {
            position: 'left',
            type: 'Category',
            fields: ['label'],
            title: 'Trainings'
        }
    ],

    series: [
        {
            type: 'bar',
            axis: 'bottom',
            title: [Ilc.resources.Manager.getResourceString('common.price'), Ilc.resources.Manager.getResourceString('common.spendings')],
            xField: 'label',
            yField: ['price', 'spendings']
        }
    ],
});