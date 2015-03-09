Ext.define('Ilc.model.scheduler.Stakeholder', {
    extend: 'Sch.model.Resource',
    
    fields: ['id', 'email', 'fullName', 'userInfo', 'roles'],

    idProperty: 'id',
    nameField: 'fullName',

    proxy: {
        type: 'rest',
        url: 'api/users',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
});