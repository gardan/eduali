Ext.define('Ilc.view.trainings.view.Documents', {
    extend: 'Ext.panel.Panel',
    xtype: 'documentspanel',

    config: {
        training: null
    },

    selectedTplId: 0,

    layout: {
        type: 'hbox',
        align: 'strech'
    },

    setPreview: function (id) {
        var url = 'documents/{templateId}/{modelId}';
        url = url.replace('{templateId}', this.selectedTplId).replace('{modelId}'.this.id);
        // set iframe to url 
        
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
                    id: 2,
                    name: 'Vasile Alecsandri'
                }
            ]
        });

        var tplStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'category', 'single'],
            data: [
                {
                    id: 1,
                    name: 'Interview.html',
                    category: 'Student',
                    single: false
                },
                {
                    id: 2,
                    name: 'Evaluation.html',
                    category: 'Student'
                },
                {
                    id: 3,
                    name: 'Contract.html',
                    category: 'Training',
                    single: true
                }
            ]
        });

        var categoryGrid = Ext.create('Ext.grid.Panel', {
            store: categoryModelsStore,
            flex: 1,
            hidden: true,
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1
                }
            ],
            listeners: {
                itemclick: function (grid, record) {
                    me.setPreview(record.get('id'));
                }
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
                    dataIndex: 'category',
                    text: 'Category'
                }
            ],
            listeners: {
                itemclick: function (grid, record) {
                    me.selectedTplId = record.get('id');
                    
                    if (record.get('single') != true) {
                        categoryGrid.isHidden() ? categoryGrid.show() : categoryGrid.hide();
                        return;
                    }
                    
                    me.setPreview(me.training.get('id'));
                }
            }
        });


        this.items = [
            tplGrid,
            {
                xtype: 'container',
                flex: 1,
                html: 'preview here'
            },
            categoryGrid
        ];
        
        this.callParent();
    }
});