Ext.define('Ilc.view.companies.List', {
    extend: 'Ext.container.Container',

    initComponent: function() {
        var me = this;
        
        var companiesStore = Ext.create('Ilc.store.Companies');
        var companiesGrid = Ext.create('Ilc.grid.Companies', {
            store: companiesStore
        });
        
        me.items = [
            companiesGrid
        ];


        companiesStore.load();
        me.callParent(arguments);
    }
});