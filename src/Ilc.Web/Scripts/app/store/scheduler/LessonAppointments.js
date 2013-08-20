Ext.define('Ilc.store.scheduler.LessonAppointments', {
    extend: 'Sch.data.EventStore',

    model: 'Sch.model.Event',

    data: [
        {
            ResourceId: 'a',
            Name: 'Lesson 1',
            StartDate: '2010-05-22 10:00',
            EndDate: '2010-05-22 12:00'
        },
        {
            ResourceId: 'b',
            Name: 'Lesson 2',
            StartDate: '2010-05-22 13:00',
            EndDate: '2010-05-22 16:00'
        },
        {
            ResourceId: 'c',
            Name: 'Lesson 3',
            StartDate: '2010-05-21 13:00',
            EndDate: '2010-05-21 16:00'
        }
    ]
});