Ext.define('Ilc.model.scheduler.Stakeholder', {
    extend: 'Sch.model.Resource',
    
    fields: ['id', 'email', 'fullName', 'userInfo'],

    nameField: 'fullName',

    get : function() {
        return 'asdasd';
    },

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