Ext.define('Ilc.view.tasks.List', {
    extend: 'Ext.container.Container',
    xtype: 'taskslist',
    
    constructor: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'action', 'customerName'],
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

        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: [
                {
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    dataIndex: 'name',
                    flex: 1
                },
                {
                    text: Ilc.resources.Manager.getResourceString('common.customer'),
                    dataIndex: 'customerName',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    tooltip: Ilc.resources.Manager.getResourceString('common.execute'),
                    icon: 'images/web/view.png',
                    handler: function (self, rowIndex, colIndex, item, e, record, row) {
                        me.fireEvent('beforeActionWindow');

                        // make first char uppercase.
                        // e.g. test => Test
                        var action = record.data.action.charAt(0).toUpperCase() + record.data.action.slice(1);
                        var window = Ext.create('Ilc.tasks.training.' + action, {
                            modal: true,
                            hideAction: 'destroy',
                            entity: record
                        });
                        window.show();
                        window.setWidth(window.getWidth());
                    }
                }            
            ]
        });

        me.addEvents('execute');

        this.items = [grid];

        this.callParent(arguments);
    }
});