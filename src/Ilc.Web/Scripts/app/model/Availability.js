Ext.define('Ilc.model.Availability', {
    extend: 'Sch.model.Event',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'resourceId', type: 'int' },
        { name: 'startDate', type: 'date', dateFormat: 'c' },
        { name: 'endDate', type: 'date', dateFormat: 'c' }
    ],
    
    idProperty: 'id',
    // nameField: 'name',
    startDateField: 'startDate',
    endDateField: 'endDate',
    resourceIdField: 'resourceId',
});