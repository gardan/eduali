Ext.define('Ilc.store.scheduler.Stakeholders', {
    extend: 'Sch.data.ResourceStore',
    
    model: 'Ilc.model.scheduler.Stakeholder',

    proxy: {
        type: 'rest',
        url: 'api/users',
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