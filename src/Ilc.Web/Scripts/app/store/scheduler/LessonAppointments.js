Ext.define('Ilc.store.scheduler.LessonAppointments', {
    extend: 'Sch.data.EventStore',

    model: 'Sch.model.Event',

    data: [
        {
            ResourceId: '1',
            Name: 'Lesson 1',
            StartDate: '2010-05-22T10:00:00.0000000+00:00',
            EndDate: '2010-05-22T12:00:00.0000000+00:00'
        },
        //{
        //    ResourceId: '2',
        //    Name: 'Lesson 2',
        //    StartDate: '2010-05-22 13:00',
        //    EndDate: '2010-05-22 16:00'
        //},
        //{
        //    ResourceId: '3',
        //    Name: 'Lesson 3',
        //    StartDate: '2010-05-21 13:00',
        //    EndDate: '2010-05-21 16:00'
        //}
    ]
});