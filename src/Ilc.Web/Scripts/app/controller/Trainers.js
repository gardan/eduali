Ext.define('Ilc.controller.Trainers', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'listtrainers': {
                'addTrainer': this.addTrainer
            }
        });
    },

    addTrainer: function (sender, model, options) {
        var trainerService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainers',
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

        trainerService.add(model)
        .then(function(response) {
            options.store.load();
        })
        .finally(function() {
            sender.close();
        });

        console.log(model);
        
    },
    
    list: function () {
        
    }
});