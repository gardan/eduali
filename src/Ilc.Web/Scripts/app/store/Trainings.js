Ext.define('Ilc.store.Trainings', {
    extend: 'Ext.data.Store',
    model: 'Ilc.model.Training',
    
    autoLoad: true,

    //data: [
    //    {
    //        status: 'Review', companyName: 'Google', trainerName: 'Gheo Ion', subject: 'English', owners: [{ id: 1, name: 'Ion' }, { id: 2, name: 'Gheo' }],
    //        startDate: '2013-07-24', endDate: '2013-08-24',
    //        students: [{ id: 1, name: 'Gheorghe Lazar', phone: '0723775755' }]
    //    }
    //],
    
    //proxy: {
    //    type: 'rest',
    //    url: 'api/trainings',
    //    extraParams: {
    //        format: 'json'
    //    },
    //    reader: {
    //        type: 'json',
    //        root: 'data',
    //        totalProperty: 'totalRecords'
    //    }
    //}
    
});