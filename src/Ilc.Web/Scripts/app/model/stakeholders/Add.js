Ext.define('Ilc.model.stakeholders.Add', {
    extend: 'Ext.data.Model',
    
    fields: ['stakeholders', 'trainingId', 'IsRemove'],

    proxy: {
        type: 'rest',
        url: 'api/stakeholders',
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