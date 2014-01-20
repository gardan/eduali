Ext.define('Ilc.model.scheduler.Trainer', {
    extend: 'Sch.model.Resource',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' }
    ],
    // 
    idProperty: 'id',
    nameField: 'name'
});