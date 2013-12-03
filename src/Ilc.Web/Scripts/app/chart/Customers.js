Ext.define('Ilc.chart.Customers', {
    extend: 'Ext.chart.Chart',
    animate: true,
    shadow: true,
    anchor: '100%',
    height: 500,
    
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
    ],
    
    max: 30,

    initComponent: function() {
        this.axes = [
            {
                title: 'Trainigs',
                type: 'Numeric',
                position: 'bottom',
                fields: ['trainingsNo'],
                minimum: 0,
                maximum: 30
            },
            {
                title: 'Customers',
                type: 'Category',
                position: 'left',
                fields: ['name'],
            }
        ];

        this.callParent(arguments);
    }
});