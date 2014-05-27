Ext.define('Ilc.view.trainings.List', {
    extend: 'Ext.container.Container',
    xtype: 'listtrainings',

    requires: [
        'Ilc.helpers.GridColumns'
    ],
    
    /*
        Object containing the querystrings    
    */
    params: {},
    
    trainingsStore: null,

    initTrainingWindow: function(record) {
        var window = Ext.create('Ilc.view.trainings.View', {
            closeAction: 'destroy',
            modal: true,
            model: record,
            listeners: {
                trainingupdated: function () {
                    console.log('trainingupdated');
                    this.trainingsStore.reload();
                }
            },
        });

        window.show();
    },

    init: function () {
        var me = this;
        me.trainingsStore = Ext.create('Ilc.store.Trainings');

        var trainingsGrid = Ext.create('Ilc.grid.Trainings', {
            store: me.trainingsStore,
            tbar: {
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'icon-add',
                        cls: 'clean-button',
                        text: Ilc.resources.Manager.getResourceString('common.newTraining'),
                        handler: function (btn, e) {
                            var window = Ext.create('Ilc.view.trainings.Create', {
                                modal: true,
                                closeAction: 'destroy'
                            });

                            window.on('addTraining', function (sender, data) {
                                me.fireEvent('addTraining', sender, data, {
                                    store: me.trainingsStore
                                });
                            });
                            window.show();
                        }
                    }
                ]
            }
        });

        trainingsGrid.on('itemdblclick', function (grid, record) {
            me.initTrainingWindow(record);
        });

        // update the columns if they change
        trainingsGrid.on('columnhide', function (headerContainer) {
            // debugger;
            console.log('hidden!!!');
            Ilc.helpers.GridColumns.updateColumns(headerContainer, 'trainings');
        });
        trainingsGrid.on('columnshow', function (headerContainer) {
            // debugger;
            console.log('shown!!!');
            Ilc.helpers.GridColumns.updateColumns(headerContainer, 'trainings');
        });
        trainingsGrid.on('columnmove', function (headerContainer) {
            // debugger;
            console.log('moved!!!');
            Ilc.helpers.GridColumns.updateColumns(headerContainer, 'trainings');
        });

        me.items = [
            trainingsGrid
        ];

        me.trainingsStore.load();
    },
    initOpen: function() {
        var me = this;
        
        me.trainingsStore = Ext.create('Ilc.store.OpenTrainings');

        var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="open-training-node">',
                    '<div>',
                        '<tpl for="subject">',
                            '<b>{name}</b>',
                        '</tpl>',
                    '</div>',        
                    '<br/>',
            
                    '<tpl if="joined == true">',
                        '<a href="#" class="joined btn btn-success">See details</a>',
                    '<tpl else>',
                        '<a href="#" class="join btn btn-primary">Join</a>',
                    '</tpl>',
                '</div>',
            '</tpl>'
        );

        var trainingsGrid = Ext.create('Ext.view.View', {
            cls: 'open-training-container',
            store: me.trainingsStore,
            itemSelector: 'div.open-training-node',
            tpl: tpl,
            listeners: {
                itemclick: function (view, record, item, index, e, eOpts) {
                    e.stopEvent();
                    
                    if (e.target.localName === 'a' && e.target.className.indexOf('join ') != -1) { // the join button was clicked
                        console.log('Join clicked.');

                        var window = Ext.create('Ilc.tasks.training.UserRegistration', {
                            entity: record,
                            listeners: {
                                afterexecute: function() {
                                    me.trainingsStore.reload();
                                }
                            },
                        });

                        window.show();
                    }
                }
            }
        });

        me.trainingsStore.load({
            params: {
                open: true
            }
        });

        me.items = [
            trainingsGrid,
            {
                xtype: 'pagingtoolbar',
                store: me.trainingsStore,
            }
        ];
    },

    initComponent: function () {
        var me = this;

        if ( Ilc.Configuration.loggedIn() == true && (me.params.open === undefined || me.params.open === 'false')) {
            me.init();
        } else {
            me.initOpen();
        }

        me.addEvents(
            'addTraining',
            'updatetraining'
        );

        me.callParent(arguments);
    }
});