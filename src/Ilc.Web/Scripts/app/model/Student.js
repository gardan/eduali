Ext.define('Ilc.model.Student', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'name', 'email', 'customer', 'userInfo'],
    // fields: ['id', 'customer', 'userInfo'],

    //validations: [{
    //    type: 'presence',
    //    field: 'email'
    //},
    //{
    //    type: 'presence',
    //    field: 'customer'
    //}],

    proxy: {
        type: 'rest',
        url: 'api/students',
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