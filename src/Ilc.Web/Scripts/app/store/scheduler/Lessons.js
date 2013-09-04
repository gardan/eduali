Ext.define('Ilc.store.scheduler.Lessons', {
    extend: 'Sch.data.ResourceStore',
    
    model: 'Sch.model.Resource',

    //data: [
    //    {
    //        Id: '1',
    //        Name: 'Lesson 1'
    //    },
    //    {
    //        Id: '2',
    //        Name: 'Lesson 2'
    //    },
    //    {
    //        Id: '3',
    //        Name: 'Lesson 3'
    //    }
    //]
    
    
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