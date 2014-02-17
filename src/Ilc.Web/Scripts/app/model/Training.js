Ext.define('Ilc.model.Training', {
    extend: 'Ext.data.Model',
    fields: ['id', 'compositeId', 'status', 'statusFriendlyName', 'customer', 'trainer', 'subject', 'owners', 'desiredStartDate', 'desiredEndDate',
        'students', 'interviewPlan', 'gradingSystemId', 'spendings', 'hours', 'lessonsNo', 'price', 'ownersConfiguration', 'location'],

    proxy: {
        type: 'rest',
        url: 'api/trainings',
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