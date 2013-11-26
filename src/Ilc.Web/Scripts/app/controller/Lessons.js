Ext.define('Ilc.controller.Lessons', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            globalplanning: {
                updatelesson: this.updateLesson
            },
            planningTab: {
                updatelesson: this.updateLesson
            }
        });
    },
    
    updateLesson: function (sender, model) {
        console.log('updateLesson');
        var lessonsService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainings/' + model.trainingId + '/lessons/' + model.id,
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
        sender.mask();
        lessonsService.edit(model)
        .then(function () {
            
        })
        .finally(function () {
            sender.unmask();
            sender.updateFinished();
        });
    }
});