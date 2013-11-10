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
            title: '&nbsp;',
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
                    }
                }
            },
            settingsContainer
        ];
        
        me.callParent(arguments);
    }
});