﻿Ext.define('Ilc.model.User', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'email', 'fullName', 'userInfo', 'roles'],
    
    proxy: {
        type: 'rest',
        url: 'api/users',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
});