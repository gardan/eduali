Ext.define('Ilc.tasks.training.Offer', {
    extend: 'Ext.window.Window',
    
    xtype: 'offerwindow',

    width: 500,

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    title: Ilc.resources.Manager.getResourceString('tasks.title.offer'),

    constructor: function (args) {
        var me = this;

        var training = args.entity;
        var tasksStore = args.tasksStore;

        var offersStore = Ext.create('Ilc.store.Offers');

        var offersGrid = Ext.create('Ilc.grid.Offers', {
            store: offersStore
        });

        var acceptedOfferBtn = Ext.create('Ext.button.Button', {
            text: Ilc.resources.Manager.getResourceString('common.accepted'),
            handler: function () {
                var model = {
                    taskEntityId: training.get('id'),
                    action: 'Accepted' // This is a special string, that is defined in TrainingStatus.cs
                };

                me.fireEvent('addOffer', me, model, {
                    tasksStore: tasksStore
                });
            }
        });


        offersGrid.on('newofferclick', function () {
            // show the CreateRfi window
            var createOfferWindow = Ext.create('Ilc.tasks.training.window.CreateRfi', {
                closeAction: 'destroy',
                entity: entity
            });

            createOfferWindow.on('addrfi', function (sender, model) {
                // TODO: Need to modify the workflow to accept offers at this step aswell.
            });

            createOfferWindow.show();
        });
        
        me.items = [
            offersGrid
        ];

        me.buttonAlign = 'left';

        me.buttons = [
            acceptedOfferBtn,
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.rejected'),
                handler: function () {
                    var model = {
                        taskEntityId: training.get('id'),
                        action: 'Rejected' // This is a special string, that is defined in TrainingStatus.cs
                    };
                    me.fireEvent('addOffer', me, model, {
                        tasksStore: tasksStore
                    });
                }
            },
            '->',
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.close'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addOffer'
        );

        offersStore.load({
            params: {
                trainingId: training.get('id')
            }
        });

        me.callParent(arguments);
    }
});