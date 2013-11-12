Ext.define('Ilc.scheduler.Planning', {
    extend: 'Sch.panel.SchedulerGrid',
    
    initComponent: function() {
        var me = this;

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

        me.callParent(arguments);
    }
});