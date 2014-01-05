Ext.define('Ilc.model.Availability', {
    extend: 'Sch.model.Event',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'resourceId', type: 'int' },
        { name: 'startDate', type: 'date', dateFormat: 'c' },
        { name: 'endDate', type: 'date', dateFormat: 'c' },
        { name: 'name', type: 'string', convert: function(v, record) {
            return record.data.startDate + ' - ' + record.data.endDate;
        } }
    ],
    
    idProperty: 'id',
    nameField: 'name',
    startDateField: 'startDate',
    endDateField: 'endDate',
    resourceIdField: 'resourceId',
});