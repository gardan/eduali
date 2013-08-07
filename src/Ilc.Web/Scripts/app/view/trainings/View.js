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
    
    layout: 'anchor',
    bodyPadding: 10,
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
                html: model.trainer.name,
                anchor: '100%'
            },
            {
                title: 'Start',
                html: model.desiredStartDate,
                anchor: '100%'
            },
            {
                title: 'End',
                html: model.desiredEndDate,
                anchor: '100%'
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