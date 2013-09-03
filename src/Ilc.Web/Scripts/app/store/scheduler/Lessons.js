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
    proxy: {
        type: 'rest',
        url: 'api/trainings/1/lessons',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    },
    autoLoad: true
});