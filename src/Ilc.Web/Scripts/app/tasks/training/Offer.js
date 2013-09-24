Ext.define('Ilc.tasks.training.Offer', {
    extend: 'Ext.window.Window',
    
    xtype: 'offerwindow',

    title: Ilc.resources.Manager.getResourceString('tasks.title.offer'),

    constructor: function (args) {
        var me = this;

        var training = args.entity;
        var tasksStore = args.tasksStore;

        // combobox - customers
        
        // combobox - trainings subject
        // combobox - students ( multiple select )
        
        // textbox - duration
        
        // combobox - location, predefined cities

        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        text: Ilc.resources.Manager.getResourceString('common.accepted'),
                        handler: function () {
                            var model = {
                                taskEntityId: training.get('id'),
                                action: 'Accepted' // This is a special string, that is defined in TrainingStatus.cs
                            };

                            me.fireEvent('addOffer', me, model);
                        }
                    },
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
                ]
            }
        ];

        me.items = [
            {
                xtype: 'label',
                text: Ilc.resources.Manager.getResourceString('tasks.offer.mainLbl')
            }
        ];

        me.addEvents(
            'addOffer'
        );

        me.callParent(arguments);
    }
});