Ext.define('Ilc.tasks.training.Interview', {
    extend: 'Ext.window.Window',
    xtype: 'interviewwindow',
    width: 600,

    constructor: function() {
        var me = this;

        var studentsStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'interviewId'],
            data: {
                data: [
                    { name: 'Ion Ionel', interviewId: 1 },
                    { name: 'Parvan Vasile', interviewId: 2 },
                    { name: 'The Pro', interviewId: 0 }
                ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });


        var studentsGrid = Ext.create('Ilc.tasks.training.grid.Students', {
            store: studentsStore,
        });

        me.items = [
            studentsGrid,
            {
                xtype: 'button',
                text: 'Done'
            }
        ];

        studentsGrid.on('addInterview', function(sender, data) {
            console.log('AddInterview event.');
        });

        me.addEvents(
            'addInterview',
            'allInterviewsAdded'
        );

        me.callParent(arguments);
    }
});