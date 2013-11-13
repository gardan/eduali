Ext.define('Ilc.scheduler.Planning', {
    extend: 'Sch.panel.SchedulerGrid',

    eventRenderer: function (eventRecord, resourceRecord, tmplData) {
        var style = 'background-color: ' + eventRecord.get('color');
        tmplData.style = style;

        // return eventRecord.get('name');
        // return {
        //     startDate: eventRecord.get('startDate')    
        // };
    },

    // eventBodyTemplate: new Ext.XTemplate(
    //     '<div>' +
    //     'Start date: {startDate}' +
    //     '</div>'
    // ),

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

        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                me.scrollToDate(date);
            }
        });

        me.tbar = [
            {
                xtype: 'button',
                text: 'Date',
                enableToggle: false,
                iconCls: 'icon-calendar',
                menu: dateMenu
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
            }
        ];

        me.callParent(arguments);
    }
});