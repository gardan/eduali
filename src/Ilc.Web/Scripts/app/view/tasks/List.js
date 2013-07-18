Ext.define('Ilc.view.tasks.List', {
    extend: 'Ext.container.Container',
    xtype: 'taskslist',
    items: [],
    
    constructor: function () {
        var me = this;
        
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'action'],
            data: {
                data: [
                    { id: 1, name: 'RFI', action: 'rfi' },
                    { id: 2, name: 'Plan Interview', action: 'planInterview' },
                    { id: 3, name: 'Interview', action: 'interview' },
                    { id: 4, name: 'Accepted', action: 'accepted' }
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

        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: [
                {
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    tooltip: 'Execute',
                    handler: function (self, rowIndex, colIndex, item, e, record, row) {
                        me.fireEvent('beforeActionWindow');

                        var action = record.data.action.charAt(0).toUpperCase() + record.data.action.slice(1);
                        var window = Ext.create('Ilc.tasks.training.' + action, {
                            modal: true
                        });
                        window.show();
                    }
                }            
            ]
        });

        me.addEvents('execute');

        this.items.push(grid);

        this.callParent(arguments);
    }
});