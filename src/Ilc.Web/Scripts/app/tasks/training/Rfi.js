Ext.define('Ilc.tasks.training.Rfi', {
    extend: 'Ext.window.Window',
    xtype: 'rfiwindow',

    layout: 'anchor',

    minWidth: 300,
    width: 500,

    defaults: {
        width: 500,
        anchor: '100%'
    },

    constructor: function (args) {
        var me = this;
        var entity = args.entity;
        var tasksStore = args.tasksStore;

        var offersStore = Ext.create('Ilc.store.Offers');

        var offersGrid = Ext.create('Ilc.grid.Offers', {
            store: offersStore
        });

        var selectOfferBtn = Ext.create('Ext.button.Button', {
            text: 'Select offer',
            disabled: true,
            handler: function () {

            }
        });

        me.items = [
            offersGrid
        ];

        offersGrid.on('newofferclick', function() {
            // show the CreateRfi window
            var createOfferWindow = Ext.create('Ilc.tasks.training.window.CreateRfi', {
                closeAction: 'destroy',
                entity: entity
            });

            createOfferWindow.on('addrfi', function (sender, model) {
                me.fireEvent('addrfi', sender, model, {
                    tasksStore: tasksStore
                });
            });

            createOfferWindow.show();
        });

        offersGrid.on('select', function (grid, record) {
            selectOfferBtn.setDisabled(false);
        });

        me.buttons = [
            selectOfferBtn,
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.close'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents('addrfi');
        
        offersStore.load({
            params: {
                trainingId: entity.get('id')
            }
        });

        this.callParent(arguments);
    }
});