﻿Ext.define('Ilc.store.Users', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'username', 'userInfo'],
    
    proxy: {
        type: 'rest',
        url: 'api/users',
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