﻿Ext.define('Ilc.chart.Trainings', {
    extend: 'Ext.chart.Chart',
    xtype: 'trainingschart',
    anchor: '100%',
    height: 500,
    legend: {
        position: 'right'
    },

    subjects: null,

    initComponent: function () {
        var me = this;

        var fields = [
            {
                name: 'month',
                convert: function (v, record) {
                    return Ext.Date.monthNames[record.data.monthNr];
                }
            },
            {
                name: 'monthNr'
            },
            {
                name: 'subjects'
            }
        ];

        Ext.Array.forEach(me.subjects, function(subject) {
            fields.push({
                name: subject.get('name').toLowerCase(),
                convert: function(v, record) {
                    return record.data.subjects[subject.get('name').toLowerCase()];
                }
            });
        });

        var trainingsCountStore = Ext.create('Ilc.store.statistics.Trainings', {
            fields: fields
        });

        me.store = trainingsCountStore;

        me.store.load();

        me.axes = [
            {
                position: 'left',
                type: 'Numeric',
                fields: ['english', 'romanian'],
                minorTickSteps: 1,
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