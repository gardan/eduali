﻿Ext.define('Ilc.view.trainings.view.InterviewPlan', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ilc.utils.Forms'
    ],

    plan: null,
    training: null,

    defaults: {
        margin: 5
    },

    initComponent: function() {
        var me = this;

        me.items = [
            {
                xtype: 'datefield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.interviewDay'),
                name: 'interviewDate',
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
                handler: function () {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = me.training.get('id');
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