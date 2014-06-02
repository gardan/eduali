Ext.define('Ilc.store.FileTemplates', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name', 'content', 'type'],

    proxy: {
        type: 'rest',
        url: 'api/filetemplates',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    },
});