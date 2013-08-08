Ext.define('Ilc.helpers.GridColumns', {
    singleton: true,
    
    requires: [
        'Ilc.helpers.AppConfig'
    ],

    process: function (columns, gridName) {

        var colConfigRecord = Ilc.helpers.AppConfig.getGridColumConfigByName(gridName);

        if (colConfigRecord == null) return columns;
        
        var colConfig = JSON.parse(colConfigRecord.data.columnConfig);
        var returnColumns = [columns.length];
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            column.hidden = colConfig[column.dataIndex].hidden;
            returnColumns[colConfig[column.dataIndex].order] = column;
        }
        return returnColumns;
    }
});