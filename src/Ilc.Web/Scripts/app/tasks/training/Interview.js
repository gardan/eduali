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

        var doneButton = Ext.create('Ext.button.Button', {
            text: 'Done',
            disabled: true,
            handler: function () {
                me.fireEvent('allInterviewsAdded', me, {});
            }
        });

        me.items = [
            studentsGrid,
            doneButton,
            {
                xtype: 'button',
                text: 'Close',
                handler: function () {
                    me.close();
                }
            }
        ];

        studentsGrid.on('addInterview', function (sender, data) {
            me.fireEvent('addInterview', sender, data, {
                store: studentsStore
            });
        });

        // enable | disable "Done" button
        studentsStore.on('load', function (store, records) {
            
            var isDisabled = false;
            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                if (record.get('interviewId') == 0) {
                    isDisabled = true;
                }
            }
            doneButton.setDisabled(isDisabled);
        });
        studentsStore.load();

        me.addEvents(
            'addInterview',
            'allInterviewsAdded'
        );

        me.callParent(arguments);
    }
});