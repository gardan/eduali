Ext.define('Ilc.store.Transfers', {
    extend: 'Ext.data.Store',
    model: 'Ilc.model.Transfer',
    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'api/transfers',
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