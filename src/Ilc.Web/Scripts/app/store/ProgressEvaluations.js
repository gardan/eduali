Ext.define('Ilc.store.ProgressEvaluations', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'progress'],
    
    //proxy: {
    //    type: 'rest',
    //    url: 'api/customers',
    //    extraParams: {
    //        format: 'json'
    //    },
    //    reader: {
    //        type: 'json',
    //        root: 'data',
    //        totalProperty: 'totalRecords'
    //    }
    //},
    
    trainingId: 0,

    constructor: function(args) {
        var me = this;

        me.trainingId = args.trainingId;

        var url = 'api/trainings/{trainingId}/progressevaluations';

        url = url.replace('{trainingId}', me.trainingId);

        me.proxy = {
            type: 'rest',
            url: url,
            extraParams: {
                format: 'json'
            },
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalRecords'
            }
        };

        me.callParent(arguments);
    }
});