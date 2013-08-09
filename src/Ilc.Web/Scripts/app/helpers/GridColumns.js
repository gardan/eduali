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
    },
    
    updateColumns: function (containerHeader, gridName) {
        // extract the new config
        var newColumnConfig = {};
        for (var i = 0; i < containerHeader.gridDataColumns.length; i++) {
            var column = containerHeader.gridDataColumns[i];
            newColumnConfig[column.dataIndex] = {
                order: i,
                hidden: column.hidden
            };
        }
        console.log(newColumnConfig);
        // update the new config
        Ilc.helpers.AppConfig.updateGridColumnConfigByName(JSON.stringify(newColumnConfig), gridName);
    }
});