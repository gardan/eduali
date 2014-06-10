Ext.define('Ilc.grid.FileTemplates', {
    extend: 'Ext.grid.Panel',
    columns: [
        {
            dataIndex: 'name',
            text: 'Name',
            flex: 1
        },
        {
            dataIndex: 'type',
            text: 'Type',
            flex: 1
        }
    ]
})