Ext.define('Ilc.controller.Availability', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            'availabilityscheduler': {
                'availabilitycreated': this.addAvailabilities
            }
        });
    },
    
    addAvailabilities: function (sender, models) {
        console.log('asdasdas');
        // normalize the models
        if (!Array.isArray(models)) {
            var model = models;
            models = [model];
        }
        

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
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            }
        };

        var preparedModel = {
            data: models
        };

        availabilitiesService.create(preparedModel)
        .then(function (response) {
            // options.store.load();
        })
        .finally(function () {
            sender.availabilityPersisted();
            // sender.close();
        });



    },

    default: function() {

    }
});