Ext.define('Ilc.model.Expense', {
    extend: 'Ext.data.Model',
    fields: ['id', 'ammount', 'expenseType'],
    
    proxy: {
        type: 'rest',
        url: 'api/trainings/0/expenses',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    }
});

Ext.define('Ilc.store.Expenses', {
    extend: 'Ext.data.Store',
    model: 'Ilc.model.Expense',
    
    constructor: function (options) {
        var trainingId = options.trainingId;
        var url = 'api/trainings/{trainingId}/expenses'.replace("{trainingId}", trainingId);
        
        this.proxy = {
            type: 'rest',
            url: url,
            extraParams: {
                format: 'json'
            },
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalRecords'
            }
        };

        this.callParent(arguments);
    }
});

Ext.define('Ilc.view.trainings.view.Expenses', {
    extend: 'Ext.panel.Panel',
    xtype: 'trainingexpenses',
    
    initComponent: function () {

        var expensesStore = Ext.create('Ilc.store.Expenses', {
            trainingId: this.trainingId
        });
        expensesStore.load();
        
        var expensesGrid = Ext.create('Ext.grid.Panel', {
            store: expensesStore,
            columns: [
                {
                    dataIndex: 'ammount',
                    text: 'Ammount'
                },
                {
                    dataIndex: 'expenseType',
                    text: 'Type',
                    renderer: function(value) {
                        return value.name;
                    }
                }
            ]
        });

        this.items = [
            expensesGrid
        ];

        this.callParent();
    }
});