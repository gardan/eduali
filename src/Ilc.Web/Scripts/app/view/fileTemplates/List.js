Ext.define('Ilc.view.fileTemplates.List', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.utils.Forms'
    ],

    fileTemplatesStore: null,

    onItemDoubleClick: function (grid, record) {
        var editor = Ext.create('Ilc.form.Editor', {
            value: record.get('content')
        });

        var window = Ext.create("Ext.window.Window", {
            width: 800,
            height: 400,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Name',
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

    onNewFileClick: function (button) {
        var me = this;
        var editor = Ext.create('Ilc.form.Editor');
        
        var window = Ext.create('Ext.window.Window', {
            width: 800,
            height: 400,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'combobox',
                    name: 'type',
                    fieldLabel: 'Type',
                    store: ['Student', 'Offer', 'Training']
                },
                editor
            ],
            buttons: [
                {
                    text: 'Create',
                    listeners: {
                        click: function () {
                            var result = {};
                            var textboxes = window.query('field');

                            result = Ilc.utils.Forms.extractModel(textboxes);
                            
                            var model = Ext.create('Ilc.model.FileTemplate', {
                                content: editor.getValue(),
                                type: result.type,
                                name: result.name
                            });
                            model.save({
                                success: function () {
                                    window.fireEvent('filetemplatecreated');
                                    me.fileTemplatesStore.reload();
                                    window.close();
                                }
                            });
                        },
                        scope: this
                    }
                }
            ],
        });

        window.show();
        

    },

    initComponent: function() {

        this.fileTemplatesStore = Ext.create('Ilc.store.FileTemplates');
        this.fileTemplatesStore.load();

        var fileTemplatesGrid = Ext.create('Ilc.grid.FileTemplates', {
            store: this.fileTemplatesStore,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            text: 'New file template',
                            listeners: {
                                click: this.onNewFileClick,
                                scope: this
                            }
                        }
                    ]
                }
            ],
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