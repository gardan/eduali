Ext.define('Ilc.model.ExpenseType', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'name'],

    proxy: {
        type: 'rest',
        url: 'api/expensetypes',
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