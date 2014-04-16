Ext.define('Ilc.store.Assesments', {
    extend: 'Ext.data.Store',

    fields: ['id', 'assesmentResults'],

    trainingId: 0,
    studentId: 0,

    initConfig: function (cfg) {
        this.trainingId = cfg.trainingId;
        this.studentId = cfg.studentId;
    },

    constructor: function (cfg) {
        var me = this;

        me.initConfig(cfg);

        var url = 'api/trainings/{trainingId}/students/{studentId}/assesments';
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