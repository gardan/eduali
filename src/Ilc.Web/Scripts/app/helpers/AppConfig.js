Ext.define('Ilc.helpers.AppConfig', {
    singleton: true,
    
    gridColumnStore: null,

    getGridColumConfigByName: function (gridName) {
        var index = Ilc.helpers.AppConfig.gridColumnStore.findBy(function (record) {
            var name = record.get('grid');
            return name == gridName;
        });
        return Ilc.helpers.AppConfig.gridColumnStore.data.items[index];
    },
    
    updateGridColumnConfigByName: function (colConfig, gridName) {
        // local 
        Ilc.helpers.AppConfig.gridColumnStore.each(function (record) {
            if (record.get('grid') == gridName) {
                record.set('columnConfig', colConfig);
                record.commit(true);
                return false;
            }
        });
        // remote
        var gridColumnConfigService = {
            update: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/config/grid',
                    method: 'PUT',
                    jsonData: entity,
                    success: function (response) {
                        deferred.resolve(response);
                    },
                    failure: function (error) {
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            }
        };

        gridColumnConfigService.update({
            columnConfig: colConfig,
            grid: gridName
        })
        .then(function () {
            console.log('settings saved.');
        }, function () {
            console.log('settings failed to save.');
        });

    }
});