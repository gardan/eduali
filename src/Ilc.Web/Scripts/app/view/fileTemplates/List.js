Ext.define('Ilc.view.fileTemplates.List', {
    extend: 'Ext.container.Container',
    
    onItemDoubleClick: function (grid, record) {
        var editor = Ext.create('Ilc.form.Editor', {
            value: record.get('content')
        });

        var window = Ext.create("Ext.window.Window", {
            width: 800,
            height: 400,
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    value: record.get('name')
                },
                editor     
            ],
            buttons: [
                {
                    text: 'Save',
                    listeners: {
                        click: function() {
                            record.set('content', editor.getValue());

                            record.save();
                            record.commit();
                            console.log(record);
                        },
                        scope: this
                    }
                }
            ]
        });

        window.show();
    },

    initComponent: function() {

        var fileTemplatesStore = Ext.create('Ilc.store.FileTemplates');
        fileTemplatesStore.load();

        var fileTemplatesGrid = Ext.create('Ilc.grid.FileTemplates', {
            store: fileTemplatesStore,
            listeners: {
                itemdblclick: this.onItemDoubleClick,
                scope: this
            }
        });

        this.items = [
            fileTemplatesGrid
        ];

        this.callParent();
    }
});