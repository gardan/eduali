Ext.define('Ilc.view.import.Trainers', {
    extend: 'Ext.container.Container',
    
    layout: 'fit',

    config: {
        trainersBulkStore: null,
    },

    getColumnIndexes: function (grid) {
        var self = this;
        var columnIndexes = [];
        var getIndex = function(column) {
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

    csvToArray: function (strData, strDelimiter){
        var arrData = [[]];
        var arrMatches = null;
        var objPattern = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ), "gi");

        while (arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                arrData.push([]);
            }
            var strMatchedValue;
            if (arrMatches[2]) {
                strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
            } else {
                strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push(strMatchedValue);
        }

        return(arrData);
    },

    loadRawStore: function(data) {
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
        this.trainersBulkStore.removeAll();
        this.trainersBulkStore.loadRawData(objectData);
    },

    initComponent: function() {
        var me = this;
        
        this.trainersBulkStore = Ext.create('Ext.data.Store', {
            fields: [
                'email', 'firstName', 'lastName', 'birthday', 'phone', 'subjects'
            ]
        });

        var editor = {
            xtype: 'textfield'
        };

        this.items = [
            {
                xtype: 'textarea',
                fieldLabel: 'Csv data',
                listeners: {
                    change: function(control, newValue) {
                        var dataArray = me.csvToArray(newValue, ',');
                        me.loadRawStore(dataArray);
                    },
                    scope: this
                }
            },
            {
                xtype: 'button',
                text: 'Import',
                listeners: {
                    scope: this,
                    click: function() {
                        var error = {
                            '0-email': 'error message'
                        };
                        

                        var errorKeys = Ext.Object.getKeys(error);
                        var errorIndexKeys = [];

                        Ext.Array.forEach(errorKeys, function (key) {
                            var index = parseInt(key.split('-')[0]);
                            if (errorIndexKeys.indexOf(index) == -1) {
                                errorIndexKeys.push(index);
                            }
                        });

                        var grid = this.query('grid')[0];

                        Ext.Array.forEach(grid.getView().getNodes(), function (row, x) {
                            if (errorIndexKeys.indexOf(x) == -1) {
                                return;
                            }

                            var rowError = {
                                email: 'error message'    
                            };
                            
                            Ext.Array.forEach(grid.columns, function (col, y) {
                                if (!rowError.hasOwnProperty(col.dataIndex)) {
                                    return;
                                }
                                var messages = [rowError[col.dataIndex]];

                                var cell = grid.getView().getCellByPosition({ row: x, column: y });

                                cell.addCls('x-form-invalid-field');
                                cell.set({ 'data-errorqtip': Ext.String.format('<ul><li class="last">{0}</li></ul>', messages.join('<br/>')) });

                            });
                        });
                    }
                }
            },
            {
                xtype: 'grid',
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
                columns: [
                    {
                        dataIndex: 'email',
                        text: 'Email',
                        editor: editor
                    },
                    {
                        dataIndex: 'firstName',
                        text: 'Firstname'
                    },
                    {
                        dataIndex: 'lastName',
                        text: 'Lastname'
                    },
                    {
                        dataIndex: 'birthday',
                        text: 'Birthday'
                    },
                    {
                        dataIndex: 'phone',
                        text: 'Phone'
                    },
                    {
                        dataIndex: 'subjects',
                        text: 'Subjects'
                    }
                ],
                store: this.trainersBulkStore
            }
        ];

        this.callParent();
    }
});