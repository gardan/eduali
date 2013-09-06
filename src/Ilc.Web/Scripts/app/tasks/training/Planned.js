Ext.define('Ilc.tasks.training.Planned', {
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
                text: Ilc.resources.Manager.getResourceString('common.execute')
            }
        ];

        me.callParent(arguments);
    }
});