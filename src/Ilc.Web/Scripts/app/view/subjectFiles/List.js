Ext.define('Ilc.view.subjectFiles.List', {
    extend: 'Ilc.grid.SubjectFiles',
    
    xtype: 'subjectfileslist',
    
    config: {
        subjectId: null
    },

    columns: [
        {
            dataIndex: 'filename',
            text: 'Filename',
            renderer: function (value, metaData, record) {
                var url = 'api/files/' + record.get('id');
                return '<a href="' + url  + '" target="_blank">' + value + '</a>';
            },
            flex: 1
        },
        {
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        },
        {
            dataIndex: 'creator',
            text: 'Creator',
            renderer: function (value) {
                return value.userInfo.name;
            },
            flex: 1
        },
        {
            dataIndex: 'createDate',
            text: 'Created at',
            flex: 1
        }
    ],

    initComponent: function () {

        this.store = Ext.create('Ilc.store.SubjectDocumentsStore', {
            subjectId: this.subjectId
        });

        this.store.load();
        this.callParent(arguments);
    }
});