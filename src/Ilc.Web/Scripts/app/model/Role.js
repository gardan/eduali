Ext.define('Ilc.model.Role', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'name'],

    proxy: {
        type: 'rest',
        url: 'api/roles',
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