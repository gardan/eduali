Ext.define('Ilc.model.User', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'email', 'userInfo'],
    
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