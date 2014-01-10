Ext.define('Ilc.store.Templates', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'templateDays'],

    proxy: {
        type: 'rest',
        url: 'api/templates',
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