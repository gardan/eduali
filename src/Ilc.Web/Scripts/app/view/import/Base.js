Ext.define('Ilc.view.import.Base', {
    extend: 'Ext.container.Container',

    layout: 'anchor',

    config: {
        bulkStore: null,
        gridColumns: null,
        importFunction: null,
        toolTipText: 'Default tip',
    },

    getColumnIndexes: function (grid) {
        var self = this;
        var columnIndexes = [];
        var getIndex = function (column) {
            if (Ext.isDefined(column.getEditor())) {
                columnIndexes.push(column.dataIndex);
            } else {
                columnIndexes.push(undefined);
            }
        };

        if (grid) {

            Ext.each(grid.columns, function (column) {
                // # only validate column with editor - with support to grouped headers
                if (column.isGroupHeader) {
                    Ext.each(column.items.items, function (subcolumn) {
                        getIndex(subcolumn);
                    });
                } else {
                    getIndex(column);
                }
            });
            return columnIndexes;
        }
    },

    csvToArray: function (strData, strDelimiter) {
        var arrData = [[]];
        var arrMatches = null;
        var objPattern = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ), "gi");

        while (arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[1];
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                arrData.push([]);
            }
            var strMatchedValue;
            if (arrMatches[2]) {
                strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
            } else {
                strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }

        return (arrData);
    },

    loadRawStore: function (data) {
        var objectData = [];
        Ext.Array.forEach(data, function (dataItem) {
            objectData.push({
                'email': dataItem[0],
                'firstName': dataItem[1],
                'lastName': dataItem[2],
                'birthday': dataItem[3],
                'phone': dataItem[4],
                'subjects': dataItem[5]
            });
        });
        this.bulkStore.removeAll();
        this.bulkStore.loadRawData(objectData);
    },

    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'textarea',
                anchor: '100%',
                fieldLabel: 'Csv data',
                emptyText: 'Paste data here',
                labelAlign: 'top',
                listeners: {
                    change: function (control, newValue) {
                        if (newValue == '') return;
                        var dataArray = me.csvToArray(newValue, ',');
                        me.loadRawStore(dataArray);
                    },
                    render: {
                        fn: function (c) {
                            Ext.create('Ext.tip.ToolTip', {
                                target: c.getEl(),
                                html: this.toolTipText,
                                trackMouse: true
                            });
                        }
                    },
                    scope: this
                }
            },
            {
                xtype: 'button',
                text: 'Import',
                margin: '0 0 10 0',
                listeners: {
                    scope: this,
                    click: function () {
                        var model = [];
                        me.bulkStore.each(function (record) {
                            model.push(record.data);
                        });

                        me.mask();
                        me.importFunction(model)
                            .then(
                            // success
                            function () {
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: 'Successfully imported data.',
                                    buttons: Ext.Msg.OK,
                                });

                            },
                            // error
                            function (response) {
                                if (response.status != 400) return;

                                var errors = Ilc.helpers.Error.decodeErrorText(response.responseText);

                                var errorKeys = Ext.Object.getKeys(errors);
                                var errorIndexKeys = [];

                                Ext.Array.forEach(errorKeys, function (key) {
                                    var index = parseInt(key.split('-')[0]);
                                    if (errorIndexKeys.indexOf(index) == -1) {
                                        errorIndexKeys.push(index);
                                    }
                                });

                                var grid = me.query('grid')[0];

                                Ext.Array.forEach(grid.getView().getNodes(), function (row, x) {
                                    if (errorIndexKeys.indexOf(x) == -1) {
                                        return;
                                    }
                                    var rowError = {};

                                    Ext.Array.forEach(errorKeys, function (key) {
                                        var index = parseInt(key.split('-')[0]);
                                        var field = key.split('-')[1];

                                        if (index == x) {
                                            rowError[field] = errors[key].messages;
                                        }
                                    });

                                    Ext.Array.forEach(grid.columns, function (col, y) {
                                        if (!rowError.hasOwnProperty(col.dataIndex)) {
                                            return;
                                        }
                                        var messages = rowError[col.dataIndex];

                                        var cell = grid.getView().getCellByPosition({ row: x, column: y });

                                        cell.addCls('x-form-invalid-field');
                                        cell.set({ 'data-errorqtip': Ext.String.format('<ul><li class="last">{0}</li></ul>', messages.join('<br/>')) });

                                    });
                                });
                            })
                        .finally(function () {
                            debugger
                            me.unmask();
                        });
                    }
                }
            },
            {
                xtype: 'grid',
                anchor: '100%',
                plugins: [
                     Ext.create('Ext.grid.plugin.RowEditing', {
                         clicksToEdit: 2,
                         listeners: {
                             edit: function (textfield, e) {
                                 e.column.removeCls('x-form-invalid-field');
                                 e.row.childNodes[e.colIdx].removeAttribute('data-errorqtip');
                                 e.record.commit();
                             }
                         }
                     })
                ],

                minHeight: 200,
                columns: this.gridColumns,
                store: this.bulkStore
            }
        ];

        this.callParent();
    }
});