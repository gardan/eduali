Ext.define('Ilc.view.tasks.List', {
    extend: 'Ext.container.Container',
    xtype: 'taskslist',

    constructor: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'action', 'customerName', 'taskObject'],
            autoLoad: true,
            //data: {
            //    data: [
            //        { id: 1, name: 'RFI', action: 'rfi' },
            //        { id: 2, name: 'Plan Interview', action: 'planInterview' },
            //        { id: 3, name: 'Interview', action: 'interview' },
            //        { id: 5, name: 'Offer', action: 'offer' },
            //        { id: 4, name: 'Accepted', action: 'accepted' },
            //        { id: 6, name: 'Planned', action: 'planned' },
            //        { id: 7, name: 'Progress evaluation', action: 'progressEvaluation' },
            //        { id: 8, name: 'Exam', action: 'exam' },
            //        { id: 9, name: 'Training evaluation', action: 'trainingEvaluation' }
            //]
            //},
            proxy: {
                type: 'rest',
                url: 'api/tasks',
                extraParams: {
                    format: 'json'
                },
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        var filters = {
            ftype: 'jsvfilters',
            // encode and local configuration options defined previously for easier reuse
            // encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
        };


        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            features: [filters],
            columns: [
                {
                    text: Ilc.resources.Manager.getResourceString('common.trainingId'),
                    dataIndex: 'taskObject',
                    renderer: function(value) {
                        return value.compositeId;
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.status'),
                    dataIndex: 'name',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }

                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.trainer'),
                    dataIndex: 'taskObject',
                    flex: 1,
                    renderer: function (value) {
                        return value.trainer.name;
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.subject'),
                    dataIndex: 'taskObject',
                    flex: 1,
                    renderer: function (value) {
                        return value.subject.name;
                    }
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.customer'),
                    dataIndex: 'customerName',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                }
            ]
        });

        grid.on('itemdblclick', function (self, record, item) {
            // make first char uppercase.
            // e.g. test => Test
            var action = record.data.action.charAt(0).toUpperCase() + record.data.action.slice(1);

            var window = Ext.create('Ilc.tasks.training.' + action, {
                modal: true,
                hideAction: 'destroy',
                entity: record,
                tasksStore: store,
                listeners: {
                    'afterexecuted': function () {
                        store.reload();
                    }
                }
            });
            

            window.show();
            window.setWidth(window.getWidth());
        });

        me.addEvents('execute');

        this.items = [grid];

        this.callParent(arguments);
    }
});