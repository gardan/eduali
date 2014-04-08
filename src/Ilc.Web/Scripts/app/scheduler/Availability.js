Ext.define('Ilc.scheduler.Availability', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype: 'availabilityscheduler',

    // viewPreset: 'hourAndDayLarge',

    plugins: [
        new Sch.plugin.Pan({
            enableVerticalPan: true,
            disableOnKey: Sch.plugin.Pan.KEY_SHIFT
        }),
        // new Sch.plugin.HeaderZoom()
    ],

    requires: [
        'Ilc.model.Availability'
    ],

    multiSelect: true,
    allowOverlap: false,
    contextMenu: null,
    
    _selectedResources: [],
    tplBtn: null,
    
    setSelectedResources: function (resources) {
        this._selectedResources = resources;
        if (resources.length > 0) {
            this.tplBtn.setDisabled(false);
        } else {
            this.tplBtn.setDisabled(true);
        }
    },
    
    getSelectedResources: function () { return this._selectedResources; },

    loadAvailabilityStore: function() {
        var me = this;

        var startDate = Ext.Date.subtract(me.getStartDate(), Ext.Date.DAY, 10);
        var endDate = Sch.util.Date.add(me.getEndDate(), Sch.util.Date.DAY, 10);
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
    
    _updateAvailabilityEvent: function(availability) {
        this.fireEvent('updateavailability', this, {
            id: availability.get('id'),
            startDate: availability.get('startDate'),
            endDate: availability.get('endDate')
        });
    },
    
    onSelect: function (selectModel) {
        if (selectModel.view.xtype == 'gridview') {
            var args = arguments;
            var selectedItems = selectModel.getSelection();
            this.setSelectedResources(selectedItems);
        }
    },
    
    onEventResized: function(sender, event) {
        this._updateAvailabilityEvent(event);
    },
    
    onEventDrop: function (sender, events) {
        var event = events[0];
        this._updateAvailabilityEvent(event);
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
                    },
                    {
                        text: 'Delete from this day',
                        iconCls: 'icon-delete',
                        handler: function () {
                            var model = {
                                id: 0,
                                startDate: scheduler.contextMenu.record.get('startDate'),
                                resourceId: scheduler.contextMenu.record.get('resourceId')
                            };
        
                            me.fireEvent('availabilityremoved', scheduler, model);

                            var records = scheduler.eventStore.queryBy(function (record) {
                                if (record.get('startDate') >= model.startDate && record.get('resourceId') == model.resourceId) {
                                    return true;
                                }
                            });
                            
                            scheduler.eventStore.remove(records.items);
        
                            console.log(model);
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
                    dataIndex: 'name'
                }
            ]
        });

        me.tplBtn = Ext.create('Ext.button.Button', {
            text: 'Create from templates',
            disabled: true,
            handler: function () {
                var createAvailabilitiesWindows = Ext.create('Ilc.view.availability.CreateAvailabilities', {
                    trainers: me.getSelectedResources()
                });
                createAvailabilitiesWindows.on('addedavailability', function () {
                    me.loadAvailabilityStore();
                });
        
                createAvailabilitiesWindows.show();
            }
        });

        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function (dp, date) {
                me.scrollToDate(date);
                me.loadAvailabilityStore();
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
            me.tplBtn
        ];

        me.zoomLevels = [
            // WEEK
            { width: 50, increment: 1, resolution: 30, preset: 'weekAndMonth', resolutionUnit: 'MINUTE' },
        
            // DAY
            { width: 100, increment: 1, resolution: 30, preset: 'weekAndDay', resolutionUnit: 'MINUTE' },
        
            //HOUR
            { width: 50, increment: 6, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' },
            { width: 50, increment: 1, resolution: 30, preset: 'hourAndDay', resolutionUnit: 'MINUTE' }
        ];

        var func = function () {
            me.un('afterlayout', func);
            me.goToNow();
            me.zoomToLevel(3);
        };
        
        me.on('afterlayout', func);
        
        me.on('select', me.onSelect);
        me.on('deselect', me.onSelect);
        me.on('eventresizeend', me.onEventResized);
        me.on('eventdrop', me.onEventDrop);

        me.addEvents(
            'availabilitycreated',
            'availabilityremoved',
            'updateavailability'
        );

        me.callParent(arguments);
        
        me.loadAvailabilityStore();
    }
});