Ext.define('Ilc.tasks.training.PlanInterview', {
    extend: 'Ext.window.Window',
    xtype: 'planinterviewwindow',

    title: Ilc.resources.Manager.getResourceString('common.planInterview'),

    constructor: function () {
        var me = this;

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

                    me.fireEvent('addinterviewplan', me, model);
                }
            }
        ];

        me.addEvents('addinterviewplan');

        me.callParent(arguments);
    }
});