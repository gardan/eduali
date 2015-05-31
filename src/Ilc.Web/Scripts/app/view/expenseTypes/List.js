Ext.define('Ilc.view.expenseTypes.List', {
    extend: 'Ext.grid.Panel',
    
    onCreateClick: function () {
        var me = this;
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

                            var model = Ext.create('Ilc.model.ExpenseType', {
                                name: result.name
                            });
                            model.save({
                                success: function () {
                                    window.fireEvent('expensetypecreated');
                                    me.store.reload();
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

    onEdit: function(editor, e) {
        var record = e.record;

        record.save({
            success: function() {
                record.commit();
            }
        });
    },

    initComponent: function() {

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clickstoedit: 2,
            autoCancel: false,
            listeners: {
                edit: {
                    fn: this.onEdit,
                    scope: this
                }
            }
        });

        var textBox = {
            xtype: 'textfield'
        };

        this.plugins = [rowEditing];

        this.store = Ext.create('Ilc.store.ExpenseTypes');
        this.store.load();

        this.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {
                        text: 'New expense type',
                        listeners: {
                            click: this.onCreateClick,
                            scope: this
                        }
                    }
                ]
            }
        ];

        this.columns = [
            {
                dataIndex: 'name',
                flex: 1,
                editor: textBox
            },
            {
                xtype: 'actioncolumn',
                items: [
                    {
                        icon: 'images/web/remove.png',
                        tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                        handler: function (grid, rowIndex, colIndex, item, e, record) {
                            record.destroy({
                                success: function () {
                                    console.log(arguments);
                                },
                                failure: function (model, response) {
                                    Ext.MessageBox.show({
                                        title: 'Error',
                                        msg: response.error.statusText,
                                        buttons: Ext.MessageBox.OK,
                                    });
                                }
                            });
                        }
                    }
                ]
            }
        ];

        this.callParent();
    }
});