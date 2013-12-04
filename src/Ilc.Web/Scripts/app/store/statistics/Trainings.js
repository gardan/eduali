Ext.define('Ilc.store.statistics.Trainings', {
    extend: 'Ext.data.Store',
    
    fields: ['month', 'english', 'french'],
    
    data: [
        {
            month: 'January',
            english: 15,
            french: 10,
            data1: 10,
            data2: 20,
            data3: 15
        },
        {
            month: 'February',
            english: 20,
            french: 16,
            data1: 20,
            data2: 30,
            data3: 25
        },
        {
            month: 'March',
            english: 26,
            french: 30,
            data1: 40,
            data2: 30,
            data3: 35
        },
        {
            month: 'April',
            english: 30,
            french: 60,
            data1: 50,
            data2: 30,
            data3: 10
        }
    ]
});