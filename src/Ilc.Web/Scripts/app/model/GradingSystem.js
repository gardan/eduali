Ext.define('Ilc.model.GradingSystem', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'name', 'grades', 'attributes'],
    
    proxy: {
        type: 'rest',
        url: 'api/gradingsystems',
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