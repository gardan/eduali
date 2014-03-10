﻿Ext.define('Ilc.store.TrainingSystems', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name', 'grades'],
    
    // data: [
    //     { id: 1, name: 'European Union' },
    //     { id: 2, name: 'Toeffel' }
    // ],
    
    proxy: {
        type: 'rest',
        url: 'api/gradingsystems',
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