Ext.define('Ilc.store.Subjects', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    
    // data: [
    //     { id: 1, name: 'English' },
    //     { id: 2, name: 'Romanian' }
    // ]
    
    proxy: {
        type: 'rest',
        url: 'api/subjects',

        //pageParam: false, //to remove param "page"
        //startParam: false, //to remove param "start"
        //limitParam: undefined, //to remove param "limit"
        //noCache: false, //to remove param "_dc"
       

        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
});