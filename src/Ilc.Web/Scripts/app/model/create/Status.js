Ext.define('Ilc.model.create.Status', {
    extend: 'Ext.data.Model',
    fields: [
        'name', 'weight'
    ],

    proxy: {
        type: 'rest',
        url: 'api/statusDefinitions',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
})