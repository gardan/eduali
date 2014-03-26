Ext.define('Ilc.model.GradingAttribute', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'name', 'gradingSystemId'],
    
    proxy: {
        type: 'rest',
        url: 'api/gradingattributes',
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