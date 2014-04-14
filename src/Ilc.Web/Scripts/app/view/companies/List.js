Ext.define('Ilc.view.companies.List', {
    extend: 'Ext.container.Container',

    initComponent: function() {
        var me = this;
        
        var companiesStore = Ext.create('Ilc.store.Companies');
        var companiesGrid = Ext.create('Ilc.grid.Companies', {
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: companiesStore,
                    dock: 'bottom'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.newCompany'),
                            iconCls: 'icon-add',
                            cls: 'clean-button',
                            handler: function() {
                                var window = Ext.create('Ilc.view.companies.Create');

                                window.on('companyadded', function() {
                                    companiesStore.reload();
                                });

                                window.show();
                            }
                        }
                    ]
                }
            ],
            store: companiesStore
        });
        
        me.items = [
            companiesGrid
        ];


        companiesStore.load();
        me.callParent(arguments);
    }
});