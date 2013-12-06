Ext.define('Ilc.chart.Trainings', {
    extend: 'Ext.chart.Chart',
    xtype: 'trainingschart',
    anchor: '100%',
    height: 500,
    legend: {
        position: 'right'
    },

    subjects: null,
  
    initComponent: function() {
        var me = this;

        me.axes = [
            {
                position: 'left',
                type: 'Numeric',
                fields: ['english', 'romanian'],
                title: 'No. of trainings'
            },
            {
                position: 'bottom',
                type: 'Category',
                fields: ['month'],
                title: 'Year'
            }
        ];

        me.series = [];
        Ext.Array.forEach(me.subjects, function (subject) {
            me.series.push({
                type: 'line',
                axis: 'left',
                xField: 'month',
                yField: [subject.get('name').toLowerCase()]
            });
        });

        me.callParent(arguments);
    }
});