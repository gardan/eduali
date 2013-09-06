Ext.define('Ilc.store.Lessons', {
    extend: 'Ext.data.Store',
    
    fields: ['Id', 'Name'],

    constructor: function (args) {
        var me = this;

        var trainingId = args.trainingId;
        var url = 'api/trainings/{trainingId}/lessons';
        if (trainingId == null) {
            console.error('No trainingId was provided.');
        }

        url = url.replace('{trainingId}', trainingId);

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