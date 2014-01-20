Ext.define('Ilc.store.scheduler.Trainers', {
    extend: 'Sch.data.ResourceStore',
    model: 'Ilc.model.scheduler.Trainer',

    requires: [
        'Ilc.model.scheduler.Trainer'
    ],

    proxy: {
        type: 'rest',
        url: 'api/trainers',
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