Ext.define('Ilc.store.scheduler.Lessons', {
    extend: 'Sch.data.ResourceStore',
    
    model: 'Sch.model.Resource',

    data: [
        {
            Id: 'a',
            Name: 'Lesson 1'
        },
        {
            Id: 'b',
            Name: 'Lesson 2'
        },
        {
            Id: 'c',
            Name: 'Lesson 3'
        }
    ]
});