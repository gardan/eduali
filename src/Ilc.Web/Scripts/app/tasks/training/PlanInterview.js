Ext.define('Ilc.tasks.training.PlanInterview', {
    extend: 'Ext.window.Window',
    xtype: 'planinterviewwindow',

    title: Ilc.resources.Manager.getResourceString('common.planInterview'),

    constructor: function (args) {
        var me = this;
        var entity = args.entity;
        var tasksStore = args.tasksStore;

        me.items = [
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.interviewDay'),
                name: 'interviewDay'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.location'),
                name: 'location'
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.createInterview'),
                handler: function (btn, e) {
                    var model = {};
                    
                    var textboxes = me.query('textfield');
                    for (var i = 0; i < textboxes.length; i++) {
                        var textbox = textboxes[i];
                        var name = textbox.name;
                        var value = textbox.getRawValue();
                        model[name] = value;
                    }
                    model.taskEntityId = entity.get('id');

                    me.fireEvent('addinterviewplan', me, model, {
                        tasksStore: tasksStore
                    });
                }
            }
        ];

        me.addEvents('addinterviewplan');

        me.callParent(arguments);
    }
});