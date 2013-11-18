Ext.define('Ilc.model.Training', {
    extend: 'Ext.data.Model',
    fields: ['id', 'compositeId', 'status', 'statusFriendlyName', 'customer', 'trainer', 'subject', 'owners', 'desiredStartDate', 'desiredEndDate', 'students', 'interviewPlan', 'gradingSystemId'],  

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