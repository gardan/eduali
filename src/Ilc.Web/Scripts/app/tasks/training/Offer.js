Ext.define('Ilc.tasks.training.Offer', {
    extend: 'Ext.window.Window',
    
    xtype: 'offerwindow',

    constructor: function (args) {
        var me = this;

        var training = args.entity;

        // combobox - customers
        
        // combobox - trainings subject
        // combobox - students ( multiple select )
        
        // textbox - duration
        
        // combobox - location, predefined cities

        me.items = [
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
                    me.fireEvent('addOffer', me, model);
                }
            }
        ];

        me.addEvents(
            'addOffer'
        );

        me.callParent(arguments);
    },
    
    html: 'The offer window, i do not have any clue what is this step supposed to do.'
});