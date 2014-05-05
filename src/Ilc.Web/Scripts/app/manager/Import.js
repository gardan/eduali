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
    },
    
    customers: function (customers) {

        var entity = {
            data: customers
        };

        var deferred = Q.defer();

        Ext.Ajax.request({
            url: 'api/import/customers',
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
    },
    
    students: function (students) {

        var entity = {
            data: students
        };

        var deferred = Q.defer();

        Ext.Ajax.request({
            url: 'api/import/students',
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