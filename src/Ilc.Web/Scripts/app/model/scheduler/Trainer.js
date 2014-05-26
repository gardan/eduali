Ext.define('Ilc.model.scheduler.Trainer', {
    extend: 'Sch.model.Resource',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        'subjects'
    ],
    // 
    idProperty: 'id',
    nameField: 'name'
});