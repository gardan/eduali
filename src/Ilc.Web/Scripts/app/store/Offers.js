Ext.define('Ilc.store.Offers', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'possibleCost', 'price', 'lessonsNo', 'lessonDuration'],

    data: {
        data: [
            {
                id: 1,
                possibleCost: '300',
                lessonsNo: 3,
                lessonDuration: 2
            }
        ]
    },
    
    proxy: {
        type: 'memory',
        // url: 'api/students',
        // extraParams: {
        //         format: 'json'
        // },
            reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalRecords'
            }
    }
});