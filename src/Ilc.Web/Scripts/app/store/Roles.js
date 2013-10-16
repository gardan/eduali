Ext.define('Ilc.store.Roles', {
    extend: 'Ext.data.Store',
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