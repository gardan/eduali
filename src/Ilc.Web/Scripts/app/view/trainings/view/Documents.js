Ext.define('Ilc.view.trainings.view.Documents', {
    extend: 'Ext.panel.Panel',
    xtype: 'documentspanel',

    requires: [
        'Ext.ux.IFrame'
    ],

    config: {
        training: null
    },

    selectedTplId: 0,

    layout: {
        type: 'hbox',
        align: 'strech'
    },

    setPreview: function (modelId, parenModelId) {
        var url = 'documents/get/{templateId}?modelId={modelId}&parentModelId={parentModelId}';
        url = url.replace('{templateId}', this.selectedTplId).replace('{modelId}', modelId).replace('{parentModelId}', parenModelId); // 
        // set iframe to url 
        
        var iframe = this.query('uxiframe')[0];
        iframe.load(url);
    },

    initCategoryGrid: function(templateType) {
        var me = this;
        var categoryStore;
        this.destroyCategoryGrid();
        
        switch (templateType) {
            case 'Student':
                categoryStore = Ext.create('Ilc.store.Students');
                this.categoryGrid = Ext.create('Ext.grid.Panel', {
                    store: categoryStore,
                    flex: 1,
                    columns: [
                        {
                            dataIndex: 'name',
                            text: 'Name',
                            flex: 1
                        }
                    ]
                });
                break;
            case 'Offer':
                categoryStore = Ext.create('Ilc.store.Offers');
                this.categoryGrid = Ext.create('Ext.grid.Panel', {
                    store: categoryStore,
                    flex: 1,
                    columns: [
                        {
                            dataIndex: 'price',
                            text: 'Price',
                            flex: 1
                        }
                    ]
                });
                categoryStore.load({
                    params: {
                        trainingId: me.training.get('id')
                    }
                });
                break;
        }

        this.categoryGrid.on('select', function (grid, record) {
            me.setPreview(record.get('id'), me.training.get('id'));
        });

        this.add(this.categoryGrid);
    },
    
    destroyCategoryGrid: function () {
        if (this.categoryGrid !== undefined) { this.categoryGrid.destroy(); }
    },

    initComponent: function() {
        var me = this;

        

        var tplStore = Ext.create('Ilc.store.FileTemplates');
        tplStore.load();
        
        

        var tplGrid = Ext.create('Ext.grid.Panel', {
            store: tplStore,
            flex: 1,
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1
                },
                {
                    dataIndex: 'type',
                    text: 'Category'
                }
            ],
            listeners: {
                select: function (grid, record) {
                    me.selectedTplId = record.get('id');
                    
                    if (record.get('type') != 'Training') {
                        me.initCategoryGrid(record.get('type'));
                        return;
                    }
                    
                    me.destroyCategoryGrid();
                    me.setPreview(me.training.get('id'), 0);
                }
            }
        });


        this.items = [
            tplGrid,
            {
                xtype: 'container',
                flex: 1,
                items: [
                    {
                        xtype: 'uxiframe'
                    }
                ]
            }
        ];
        
        this.callParent();
    }
});