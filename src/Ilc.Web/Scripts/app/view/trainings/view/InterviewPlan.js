Ext.define('Ilc.view.trainings.view.InterviewPlan', {
    extend: 'Ext.panel.Panel',
    
    plan: null,

    defaults: {
        margin: 5
    },

    initComponent: function() {
        var me = this;

        me.items = [
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.interviewDay'),
                name: 'interviewDay',
                disabled: (me.plan === null),
                value: me.plan == null ? null : new Date(me.plan.get('date'))
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.location'),
                name: 'location',
                disabled: (me.plan === null),
                value: me.plan == null ? null : me.plan.get('location')
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.update'),
                disabled: (me.plan === null),
                handler: function() {
                    var model = {
                        id: 1,
                        interviewDate: '2013-11-11',
                        location: 'asjodhajshd'
                    };

                    me.fireEvent('updatetraining', me, model);
                    me.mask();
                }
            }
        ];

        me.addEvents(
            'updatetraining'
        );

        this.callParent();
    }
})