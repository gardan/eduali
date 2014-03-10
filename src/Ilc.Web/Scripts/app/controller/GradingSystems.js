Ext.define('Ilc.controller.GradingSystems', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            editgradingsystmwindow: {
                update: this.onUpdate
            }
        });
    },
    
    onUpdate: function(sender, model) {
        var gradingSystemsService = {
            update: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/gradingsystems/' + entity.id,
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
        
        gradingSystemsService.update(model)
        .then(function (response) {
            sender.gradingSystemUpdated();
        })
        .finally(function () {

        });
    }
});