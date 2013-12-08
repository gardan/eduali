Ext.define('Ilc.tasks.training.Planned', {
    extend: 'Ext.window.Window',

    xtype: 'plannedwindow',

    constructor: function (args) {
        var me = this;

        var training = args.entity;
        var tasksStore = args.tasksStore;

        // combobox - customers

        // combobox - trainings subject
        // combobox - students ( multiple select )

        // textbox - duration

        // combobox - location, predefined cities

        me.items = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.yes'),
                handler: function () {
                    var model = {
                        taskEntityId: training.get('id')
                    };
                    me.fireEvent('planned.execute', me, model, {
                        tasksStore: tasksStore
                    });
                }
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.no'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'planned.execute'
        );

        me.callParent(arguments);
    }
});