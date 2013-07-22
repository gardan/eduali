Ext.define('Ilc.view.trainings.View', {
    extend: 'Ext.window.Window',
    
    title: 'Trainings details',
    requires: [
        'Ext.util.Point'
    ],
    width: 400,
    heigth: 600,
        
    defaults: {
        xtype: 'panel'
    },
    
    // layout: 'fit',

    constructor: function (cfg) {
        var me = this;
        var model = cfg.model;

        var studentsStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'phone'],
            data: model.students
        });
        
        me.items = [
            {
                title: 'Trainer',
                html: model.trainerName
            },
            {
                title: 'Start',
                html: model.startDate
            },
            {
                title: 'End',
                html: model.endDate
            },
            {
                xtype: 'grid',
                store: studentsStore,
                title: 'Students',
                
                columns: [
                    {
                        dataIndex: 'name',
                        text: 'Name',
                        flex: 1
                    },
                    {
                        dataIndex: 'phone',
                        text: 'Phone',
                        flex: 1
                    }
                ]
            }
        ];

        me.callParent(arguments);
    }
});