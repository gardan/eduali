Ext.define('Ilc.model.Claim', {
    extend: 'Ext.data.Model',
    fields: ['name'],
    idProperty: 'name',
    
    proxy: {
        type: 'rest',
        url: 'api/claims',
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