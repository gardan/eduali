Ext.define('Ilc.model.Expense', {
    extend: 'Ext.data.Model',
    fields: ['id', 'ammount', 'expenseType', 'trainingId'],
    
    proxy: {
        type: 'rest',
        url: 'api/expenses',
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

    onNewExpense: function () {
        var me = this;
        var expenseTypesStore = Ext.create('Ilc.store.ExpenseTypes').load();

        var window = Ext.create('Ext.window.Window', {
            items: [
                {
                    xtype: 'numericfield',
                    fieldLabel: 'Ammount',
                    name: 'ammount'
                },
                {
                    fieldLabel: Ilc.resources.Manager.getResourceString('common.type'),
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'expenseType.id',
                    store: expenseTypesStore
                }
            ],
            buttons: [
                {
                    text: 'Create',
                    listeners: {
                        click: function () {
                            var result = {};
                            var textboxes = window.query('field');

                            result = Ilc.utils.Forms.extractModel(textboxes);

                            var model = Ext.create('Ilc.model.Expense', {
                                ammount: result.ammount,
                                expenseType: result.expenseType,
                                trainingId: me.trainingId
                            });
                            
                            model.save({
                                success: function () {
                                    me.expensesStore.reload();
                                    window.close();
                                }
                            });
                            console.log(result);
                        },
                        scope: this
                    }
                },
                {
                    text: 'Cancel',
                    handler: function() {
                        window.close();
                    }
                }
            ]
        });

        window.show();
    },
    
    initComponent: function () {
        var me = this;
        
        this.expensesStore = Ext.create('Ilc.store.Expenses', {
            trainingId: this.trainingId
        });
        this.expensesStore.load();
        
        var expensesGrid = Ext.create('Ext.grid.Panel', {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'New expense',
                            listeners: {
                                click: this.onNewExpense,
                                scope: this
                            }
                        }
                    ]
                }
            ],
            store: this.expensesStore,
            columns: [
                {
                    dataIndex: 'ammount',
                    text: 'Ammount',
                    flex: 1
                },
                {
                    dataIndex: 'expenseType',
                    text: 'Type',
                    renderer: function(value) {
                        return value.name;
                    },
                    flex: 1
                }
            ]
        });

        expensesGrid.on('itemcontextmenu', function (view, record, item, index, e) {
            e.stopEvent();

            if (!me.rowContextMenu) {
                me.rowContextMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            text: 'Delete',
                            handler: function () {
                                var selected = expensesGrid.selModel.getSelection();
                                Ext.MessageBox.confirm(
                                    'Confirm delete',
                                    'Are you sure?',
                                    function (btn) {
                                        if (btn == 'yes') {
                                            record.destroy({
                                                success: function() {
                                                    me.expensesStore.remove(selected[0]);
                                                }
                                            });

                                            
                                        }
                                    }
                                );
                            }
                        }
                    ]
                });
            }

            me.rowContextMenu.showAt(e.getXY());
        });

        this.items = [
            expensesGrid
        ];

        this.callParent();
    }
});