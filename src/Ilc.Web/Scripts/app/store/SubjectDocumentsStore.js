Ext.define('Ilc.store.SubjectDocumentsStore', {
    extend: 'Ext.data.Store',
    
    fields: [
        'id',
        'filename',
        'description',
        'creator',
        'createDate'
    ],
       
    subjectId: 0,

    constructor: function (args) {
        this.subjectId = args.subjectId == null ? 0 : args.subjectId;

        var url = 'api/subjects/{id}/files';

        url = url.replace('{id}', this.subjectId);

        this.proxy = {
            type: 'rest',
            url: url,
            extraParams: {
                format: 'json'
            },
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalRecords'
            }
        };

        this.callParent(arguments);
    }
});