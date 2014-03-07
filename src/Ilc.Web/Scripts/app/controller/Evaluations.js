Ext.define('Ilc.controller.Evaluations', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            viewstudentevaluationwindow: {
                updateevaluation: this.updateEvaluation
            }
        });
    },

    updateEvaluation: function(sender, model) {
        var progressEvaluationsService = {
            update: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/progressevaluations/' + entity.id,
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

        progressEvaluationsService.update(model)
        .then(function (response) {
            sender.evaluationUpdated();
        })
        .finally(function () {

        });
    }
});