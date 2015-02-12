Ext.define('Ilc.view.customerLogs.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'logslist',

    minHeight: 200,

    config: {
        customerId: null
    },

    onEdit: function (editor, e) {
        var record = e.record;

        record.save({
            success: function() {
                record.commit();
            }
        });
    },

    onNewLog: function () {
        var me = this;
        var customerLogRecord = Ext.create('Ilc.model.CustomerLog', {
            customerId: me.customerId
        })
            .save({
                success: function (record, operation) {
                    var createdLog = Ext.JSON.decode(operation.response.responseText);
                    customerLogRecord.set('id', createdLog.id);
                    me.store.insert(0, customerLogRecord);
                    // me.rowEditing.startEdit(0, 0);
                },
                failure: function() {
                }
            });
    },

    initDockedItems: function() {
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'icon-add',
                        cls: 'clean-button',
                        text: Ilc.resources.Manager.getResourceString('common.addAction'),
                        listeners: {
                            click: this.onNewLog,
                            scope: this
                        }
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: this.store,
                dock: 'bottom'
            }
        ];
    },

    initComponent: function() {

        this.initDockedItems();

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

        this.plugins = [rowEditing];

        var textBox = {
            xtype: 'textfield'
        };

        var calendar = {
            xtype: 'datefield'
        };

        var dropdownlist = {
            xtype: 'combobox',
            store: Ext.create('Ext.data.Store', {
                fields: ['name'],
                data: [
                    { name: 'Meeting' },
                    { name: 'Phone' },
                    { name: 'Email' },
                    { name: 'Other' }
                ]
            }),
            displayField: 'name',
        };

        this.columns = [
            {
                dataIndex: 'body',
                text: 'Text',
                editor: textBox,
                flex: 0.7
            },
            {
                dataIndex: 'type',
                text: 'Type',
                editor: dropdownlist
            },
            {
                dataIndex: 'createDate',
                text: 'Created at',
                editor: calendar,
                flex: 0.3,
                renderer: function(value, meta, record) {
                    var formatted = Ext.Date.format(new Date(value), Ilc.resources.Manager.getResourceString('formats.extjsdateonly'));
                    return formatted;
                }
            }
        ];

        this.callParent();
    }
});