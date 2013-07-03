Ext.define('Ilc.grid.Transfers', {
    extend: 'Ext.grid.Panel',
    xtype: 'transfergrid',
    
    requires: [
        'Ext.util.Point'
    ],

    store: 'Transfers',

    columns: [
        {
            text: 'Student name',
            dataIndex: 'studentName',
            flex: 1
        }
        ,
        {
            text: 'Pdf',
            dataIndex: 'id',
            flex: 1,
            renderer: function (value, metaData, record) {
                return '<a target="_blank" href="transfers/pdf/' + value + '">Pdf</a>';
            }
        }
    ]
});