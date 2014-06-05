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

    initComponent: function() {
        var me = this;

        var categoryModelsStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {
                    id: 1,
                    name: 'Ion Ionel'
                },
                {
                    id: 8,
                    name: 'Vasile Alecsandri'
                }
            ]
        });

        var tplStore = Ext.create('Ilc.store.FileTemplates');
        tplStore.load();
        
        var categoryGrid = Ext.create('Ilc.grid.FileTemplates', {
            store: categoryModelsStore,
            flex: 1,
            hidden: true,
            listeners: {
                select: function (grid, record) {
                    me.setPreview(record.get('id'), this.training.get('id'));
                },
                scope: this
            }
        });

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

                        categoryGrid.show();
                        return;
                    }
                    
                    categoryGrid.hide();
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
            },
            categoryGrid
        ];
        
        this.callParent();
    }
});