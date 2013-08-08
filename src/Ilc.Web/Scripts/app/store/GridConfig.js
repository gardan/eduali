Ext.define('Ilc.store.GridConfig', {
    extend: 'Ext.data.Store',
    
    fields: ['grid', 'columnConfig'],
    
    // data: [
    //     {
    //         grid: 'trainings',
    //         columnConfig: JSON.stringify({
    //             status:   { order: 2, hidden: false },
    //             customer: { order: 1, hidden: false },
    //             trainer:  { order: 0, hidden: false },
    //             subject:  { order: 3, hidden: false },
    //             owners:   { order: 4, hidden: false }
    //         })
    //     }
    // ],
    
    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'api/config/grid',
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