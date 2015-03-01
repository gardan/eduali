Ext.define('Ilc.model.students.AddToTraining', {
    extend: 'Ext.data.Model',

    fields: ['students', 'trainingId'],

    proxy: {
        type: 'rest',
        url: 'api/trainings/students',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
});