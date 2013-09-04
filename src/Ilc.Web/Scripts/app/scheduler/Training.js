Ext.define('Ilc.scheduler.Training', {
    extend: 'Sch.panel.SchedulerGrid',

    allowOverlap: false,
    constrainDragToResource: true,
    snapToIncrement: true,
    eventResizeHandles: 'end',

    // orientation: 'vertical',

    // Setup view configuration
    // startDate: startDate,
    // endDate: Sch.util.Date.add(startDate, Sch.util.Date.DAY, 10),

    viewPreset: 'hourAndDay',

    // Setup your static columns
    

    constructor: function () {
        var me = this;

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:

        Ext.apply(this, {
            columns: [
                { header: Ilc.resources.Manager.getResourceString('common.lessons'), width: 130, dataIndex: 'Name', visible: false }
            ]
        });

        // zooming
         var slider = Ext.create('Ext.slider.SingleSlider', {
             style: 'margin-left:10px',
             width: 100,
             value: 0,
             increment: 1,
             minValue: 0,
             maxValue: 10,
             listeners: {
                 change: function(p, v) {
                     me.zoomToLevel(parseInt(v), true);
                 }
             }
         });
         
         me.bbar = [
             slider
         ];
         
         me.listeners = {
             eventcontextmenu: function(s, rec, e) {
                 e.stopEvent();
         
                 if (!s.ctx) {
                     s.ctx = Ext.create('Ext.menu.Menu', {
                         items: [{
                             text: 'Delete event',
                             iconCls: 'icon-delete',
                             handler: function() {
                                 s.eventStore.remove(rec);
                             }
                         }]
                     });
                 }
                 s.ctx.rec = rec;
                 s.ctx.showAt(e.getXY());
             },
             afterlayout: function () {
                 slider.setMinValue(10);
                 slider.setMaxValue(14);
         
                 slider.setValue(me.getCurrentZoomLevelIndex());
             },
         
             single: true
         };

        me.callParent(arguments);
    }
});