Ext.define('Ilc.model.Student', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'name', 'email', 'customer', 'userInfo'],
    
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