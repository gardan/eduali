Ext.define('Ilc.scheduler.Planning', {
    extend: 'Sch.panel.SchedulerGrid',

    initComponent: function() {
        var me = this;

        // scrolling to event
        var eventsCombo = Ext.create('Ext.form.ComboBox', {
            store: me.eventStore,
            triggerAction: 'all',
            editable: false,
            queryMode: 'local',
            displayField: 'name', //,
            valueField: 'id',
        });

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:
        Ext.apply(this, {
            columns: [
                {
                    header: Ilc.resources.Manager.getResourceString('common.trainer'),
                    width: 130,
                    dataIndex: 'name'
                }
            ]
        });

        me.tbar = [
            eventsCombo,
            {
                text: 'Scroll to event',
                iconCls: 'go',
                handler: function () {
                    var val = eventsCombo.getValue(),
                        // doHighlight = Ext.getCmp('btnHighlight').pressed,
                        rec = me.eventStore.getAt(me.eventStore.find('id', val));

                    if (rec) {
                        me.getSchedulingView().scrollEventIntoView(rec, true);
                    }
                }
            },
            {
                text: 'prev',
                handler: function () {
                    me.shiftPrevious();
                }
            },
            {
                text: 'next',
                handler: function () {
                    me.shiftNext();
                }
            },
        ];

        me.callParent(arguments);
    }
});