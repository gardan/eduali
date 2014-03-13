Ext.define('Ilc.grid.SubjectFiles', {
    extend: 'Ext.grid.Panel',
    
    columns: [
        {
            dataIndex: 'filename',
            text: 'Filename',
            flex: 1
        },
        {
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        },
        {
            dataIndex: 'creator',
            text: 'Filename',
            renderer: function(value) {
                return value.name;
            },
            flex: 1
        },
        {
            dataIndex: 'createDate',
            text: 'Created at',
            flex: 1
        }
    ]
});