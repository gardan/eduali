﻿Ext.define('Ilc.model.stakeholders.Add', {
    extend: 'Ext.data.Model',
    
    fields: ['stakeholders', 'trainingId'],

    proxy: {
        type: 'rest',
        url: 'api/stakeholders',
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