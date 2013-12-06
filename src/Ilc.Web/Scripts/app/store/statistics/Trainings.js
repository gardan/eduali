Ext.define('Ilc.store.statistics.Trainings', {
    extend: 'Ext.data.Store',
    
    fields: [
        {
            name: 'month',
            convert: function(v, record) {
                return Ext.Date.monthNames[record.data.monthNr];
            }
        },
        {
            name: 'romanian',
            convert: function(v, record) {
                return record.data.subjects.romanian;
            }
        },
        {
            name: 'monthNr'
        },
        {
            name: 'subjects'
        }
    ],
    
    proxy: {
        type: 'rest',
        url: 'api/statistics/trainings',
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