Ext.define('Ilc.tasks.training.grid.Students', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ilc.utils.Forms'
    ],
    
    viewConfig: {
        getRowClass: function(record) {
            var interviewId = record.get('interviewId');
            return interviewId == 0 ? 'grid-row-pending' : 'grid-row-complete';
        }
    },

    constructor: function (args) {
        var me = this;

        var viewLbl = Ilc.resources.Manager.getResourceString('common.view');
        var addLbl = Ilc.resources.Manager.getResourceString('common.add');
        var entity = args.entity;

        me.columns = [
            {
                dataIndex: 'name',
                text: Ilc.resources.Manager.getResourceString('common.name'),
                flex: 1
            }
        ];

        me.listeners = {
            itemdblclick:  function(grid, record) {
                var action = (record.get('interviewId') == 0 ? 'Create' : 'View');

                var windowClass = 'Ilc.tasks.training.window.' + action + 'StudentInterview';
                var window = Ext.create(windowClass, {
                    student: record,
                    task: entity
                });

                if (action === 'Create') {
                    window.on('addInterview', function (sender, data) {
                        me.fireEvent('addInterview', sender, data);
                    });
                }


                window.show();
            }
        };

        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});