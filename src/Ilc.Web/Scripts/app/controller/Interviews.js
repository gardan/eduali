Ext.define('Ilc.controller.Interviews', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            editinterviewindow: {
                editinterview: this.editInterview
            }
        });
    },
    
    editInterview: function (sender, model) {
        var interviewsService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/interviews/' + entity.id,
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

        interviewsService.edit(model)
        .then(function (response) {
            sender.editComplete();
            // options.store.load();
        })
        .finally(function () {
            
            // sender.close();
        });
    }
});