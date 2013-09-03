Ext.define('Ilc.tasks.training.Offer', {
    extend: 'Ext.window.Window',
    
    constructor: function () {
        var me = this;

        // combobox - customers
        
        // combobox - trainings subject
        // combobox - students ( multiple select )
        
        // textbox - duration
        
        // combobox - location, predefined cities

        me.items = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.accepted')
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.rejected')
            }
        ];
              
        me.callParent(arguments);
    },
    
    html: 'The offer window, i do not have any clue what is this step supposed to do.'
});