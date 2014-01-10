﻿Ext.define('Ilc.scheduler.Availability', {
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

    contextMenu: null,

    loadAvailabilityStore: function() {
        var me = this;

        var startDate = Sch.util.Date.add(me.getStartDate(), Sch.util.Date.DAY, -2);
        var endDate = Sch.util.Date.add(me.getEndDate(), Sch.util.Date.DAY, 2);
        var availabilityStore = me.eventStore;

        availabilityStore.load({
            params: {
                startDate: startDate,
                endDate: endDate,
                
                ifTrainer: true
            }
        });
    },

    /**
     * @param {Object} options containes the new id and the internalId of the record. e.g. { id: 1, internalId: 'ext-data-123' }
     */
    availabilityPersisted: function(options) {
        console.log('persisted');
    },

    initComponent: function () {
        var me = this;

        me.on('beforeeventadd', function (scheduler, newEvent) {
            // Save the availability event
            var model = {
                startDate: newEvent.get('startDate'),
                endDate: newEvent.get('endDate'),
                resourceId: newEvent.get('resourceId')
            };

            me.fireEvent('availabilitycreated', scheduler, model, {
                internalId: newEvent.internalId
            });
        });

        me.on('eventcontextmenu', function (scheduler, eventRecord, e, eOpts) {
            e.stopEvent();

            if (!scheduler.contextMenu) {
                scheduler.contextMenu = Ext.create('Ext.menu.Menu', {
                    items: [{
                        text: 'Delete event',
                        iconCls: 'icon-delete',
                        handler: function () {
                            var model = {
                                id: scheduler.contextMenu.record.get('id')
                            };
                            
                            me.fireEvent('availabilityremoved', scheduler, model);
                            scheduler.eventStore.remove(scheduler.contextMenu.record);
                        }
                    }]
                });
            }
            scheduler.contextMenu.record = eventRecord;
            scheduler.contextMenu.showAt(e.getXY());
        });

        // Fix for this: https://www.assembla.com/spaces/bryntum/support/tickets/13#/activity/ticket:
        Ext.apply(this, {
            columns: [
                {
                    header: Ilc.resources.Manager.getResourceString('common.trainer'),
                    width: 130,
                    dataIndex: 'Name'
                }
            ]
        });

        me.tbar = [
            {
                iconCls: 'icon-left',
                handler: function () {
                    me.shiftPrevious();
                    me.loadAvailabilityStore();
                }
            },
            {
                iconCls: 'icon-right',
                handler: function () {
                    me.shiftNext();
                    me.loadAvailabilityStore();
                }
            },
            {
                iconCls: 'icon-zoom-in',
                handler: function () {
                    me.zoomIn();
                    me.loadAvailabilityStore();
                }
            },
            {
                iconCls: 'icon-zoom-out',
                handler: function () {
                    me.zoomOut();
                    me.loadAvailabilityStore();
                }
            },
            {
                text: 'Create from templates',
                handler: function () {
                    var createAvailabilitiesWindows = Ext.create('Ilc.view.availability.CreateAvailabilities');
                    createAvailabilitiesWindows.show();
                }
            }
        ];

        me.addEvents(
            'availabilitycreated',
            'availabilityremoved'
        );

        me.callParent(arguments);
        
        me.loadAvailabilityStore();
    }
});