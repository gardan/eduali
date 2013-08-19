Ext.define('Ilc.tasks.training.grid.Students', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ilc.utils.Forms'
    ],
    
    constructor: function () {
        var me = this;

        var viewLbl = Ilc.resources.Manager.getResourceString('common.view');
        var addLbl = Ilc.resources.Manager.getResourceString('common.add');

        me.columns = [
            {
                dataIndex: 'name',
                text: Ilc.resources.Manager.getResourceString('common.name'),
                flex: 1
            },
            {
                xtype: 'actioncolumn',
                text: Ilc.resources.Manager.getResourceString('common.interview'),
                items: [
                    {
                        getClass: function(v, meta, record) {
                            return record.get('interviewId') == 0 ? 'add-col' : 'view-col';
                        },
                        getTip: function (v, meta, record) {
                            return record.get('interviewId') == 0 ? addLbl : viewLbl;
                        },
                        handler: function(grid, rowIndex, colIndex, item, e, record) {
                            var action = (record.get('interviewId') == 0 ? "Create" : "View");
 
                            var windowClass = 'Ilc.tasks.training.window.' + action + 'StudentInterview';
                            var window = Ext.create(windowClass);
                            window.show();
                        }
                    }
                ]
            }
        ];

        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});