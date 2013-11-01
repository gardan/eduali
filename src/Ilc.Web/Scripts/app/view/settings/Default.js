Ext.define('Ilc.view.settings.Default', {
    extend: 'Ext.container.Container',
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

    requires: [
        'Ilc.view.settings.Categories'
    ],

    initComponent: function () {
        var me = this;

        var settingsContainer = Ext.create('Ext.panel.Panel', {
            title: 'Panel 2',
            flex: 1
        });

        me.items = [
            {
                xtype: 'settingscategories',
                listeners: {
                    'leafselected': function (tree, record) {
                        settingsContainer.removeAll();
                        var newComponent = Ext.create(record.get('component'));
                        settingsContainer.add(newComponent);
                        console.log(record.data);
                    }
                }
            },
            settingsContainer
        ];
        
        me.callParent(arguments);
    }
});