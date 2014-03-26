Ext.define('Ilc.store.Interviews', {
    extend: 'Ext.data.Store',
    
    fields: ['id',
        'listeningLevel', 'targetListeningLevel',
        'readingLevel', 'targetReadingLevel',
        'interactiveTalkingLevel', 'targetInteractiveTalkingLevel',
        'productiveTalkingLevel', 'targetProductiveTalkingLevel',
        'writingLevel', 'targetWritingLevel',
        'interviewResults' ],
    
    trainingId: 0,
    studentId: 0,
    
    initConfig: function(cfg) {
        this.trainingId = cfg.trainingId;
        this.studentId = cfg.studentId;
    },

    constructor: function(cfg) {
        var me = this;

        me.initConfig(cfg);

        var url = 'api/trainings/{trainingId}/students/{studentId}/interviews';
        url = url.replace('{trainingId}', me.trainingId);
        url = url.replace('{studentId}', me.studentId);

        me.proxy = {
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

        me.callParent(arguments);
    }
});