Ext.define('Ilc.tasks.training.PlanInterview', {
    extend: 'Ext.window.Window',
    xtype: 'planinterviewwindow',

    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'datefield',
                fieldLabel: 'Interview day',
                name: 'interviewDay'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Location',
                name: 'location'
            },
            {
                xtype: 'button',
                text: 'Create plan',
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