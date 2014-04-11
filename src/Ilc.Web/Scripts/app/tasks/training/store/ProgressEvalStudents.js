Ext.define('Ilc.tasks.training.store.ProgressEvalStudents', {
    extend: 'Ext.data.Store',

    fields: ['id', 'name', 'progressEvaluationId'],
    // data: {
    //     data: [
    //         { id: 1, name: 'Ion Ionel', interviewId: 1 },
    //         { id: 2, name: 'Parvan Vasile', interviewId: 2 },
    //         { id: 3, name: 'The Pro', interviewId: 0 }
    //     ]
    // },

    constructor: function (args) {
        var me = this;

        var url = 'api/trainings/{id}/progressEvaluationsStudents';
        var trainingId = args.trainingId;
        if (trainingId == null) {
            console.error('No trainingId was provided.');
        }

        url = url.replace('{id}', trainingId);

        me.proxy = {
            type: 'rest',
            url: url,
            extraParams: {
                format: 'json',
                lessonId: 0
            },
            reader: {
                type: 'json',
                root: 'data'
            }
        };

        me.callParent(args);
    }
});