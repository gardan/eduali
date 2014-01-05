Ext.define('Ilc.scheduler.Availability', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'availabilityscheduler',

    viewPreset: 'hourAndDayLarge',

    plugins: [
                new Sch.plugin.Pan({
                    enableVerticalPan: true,
                    disableOnKey: Sch.plugin.Pan.KEY_SHIFT
                })
    ],

    requires: [
        'Ilc.model.Availability'
    ],
    
    initComponent: function () {
        var me = this;

        me.tbar = [
            {
                iconCls: 'icon-left',
                handler: function () {
                    me.shiftPrevious();
                }
            },
            {
                iconCls: 'icon-right',
                handler: function () {
                    me.shiftNext();
                }
            },
            {
                iconCls: 'icon-zoom-in',
                handler: function () {
                    me.zoomIn();
                }
            },
            {
                iconCls: 'icon-zoom-out',
                handler: function () {
                    me.zoomOut();
                }
            }
        ];

        me.callParent(arguments);
    }
});