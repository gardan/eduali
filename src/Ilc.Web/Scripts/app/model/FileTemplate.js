Ext.define('Ilc.model.FileTemplate', {
    extend: 'Ext.data.Model',
    
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
    }
});