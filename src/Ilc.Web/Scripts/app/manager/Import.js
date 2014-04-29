Ext.define('Ilc.manager.Import', {
    
    
    trainers: function(trainers) {

        var entity = {
            data: trainers
        };

        var deferred = Q.defer();

        Ext.Ajax.request({
            url: 'api/import/trainers',
            method: 'POST',
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

});