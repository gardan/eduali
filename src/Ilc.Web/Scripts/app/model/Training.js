﻿Ext.define('Ilc.model.Training', {
    extend: 'Ext.data.Model',
    fields: ['id', 'compositeId', 'status', 'statusFriendlyName', 'customer', 'trainer', 'subject', 'owners', 'desiredStartDate', 'desiredEndDate',
        'students', 'interviewPlan', 'gradingSystemId', 'spendings', 'hours', 'lessonsNo', 'price', 'ownersConfiguration', 'location',
        'public', 'requiredStudents', 'dateOfValidation', 'gradingAttributes', 'status', 'stakeHolders',
        'joined', 'expenses' // This property right here, is only used when dealing with the open trainings returned from api/trainings?open=true ( usually a student will call this endpoint )
    ],

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