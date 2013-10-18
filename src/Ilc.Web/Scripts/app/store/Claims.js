Ext.define('Ilc.store.Claims', {
    extend: 'Ext.data.Store',
    
    model: 'Ilc.model.Claim',

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