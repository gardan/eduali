Ext.define('Ilc.view.fileTemplates.List', {
    extend: 'Ext.container.Container',
    
    initComponent: function() {

        var fileTemplatesStore = Ext.create('Ilc.store.FileTemplates');
        fileTemplatesStore.load();

        var fileTemplatesGrid = Ext.create('Ilc.grid.FileTemplates', {
            store: fileTemplatesStore
        });

        this.items = [
            fileTemplatesGrid
        ];

        this.callParent();
    }
});