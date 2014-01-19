Ext.define('Ilc.controller.Availability', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            'availabilityscheduler': {
                'availabilitycreated': this.addAvailabilities,
                'availabilityremoved': this.removeAvailability
            },
            'createavailabilities': {
                'addavailability': this.addAvailabilities
            }
        });
    },
    
    addAvailabilities: function (sender, model) {   
        var availabilitiesService = {
            create: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/availabilities',
                    method: 'POST',
                    jsonData: entity,
                    success: function (response) {
                        deferred.resolve(response);
                    },
                    failure: function (error) {
                        if (error.status == 400) {
                            var errorObj = Ext.JSON.decode(error.responseText);
                            deferred.reject(errorObj);
                        }
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            }
        };

        availabilitiesService.create(model)
        .then(function (response) {
            sender.availabilityPersisted();
        }, function (error) {
            sender.availabilityPersistedError(error);
        })
        .finally(function () {
            
            // sender.close();
        });

    },

    removeAvailability: function(sender, model) {
        var availabilitiesService = {
            delete: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/availabilities/' + entity.id,
                    method: 'DELETE',
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
        
        availabilitiesService.delete(model)
        .then(function (response) {
            // options.store.load();
        })
        .finally(function () {
            // sender.availabilityPersisted();
            // sender.close();
        });
    },

    default: function() {

    }
});