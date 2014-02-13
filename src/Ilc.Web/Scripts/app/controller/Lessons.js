Ext.define('Ilc.controller.Lessons', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            globalplanning: {
                updatelesson: this.updateLesson
            },
            planningTab: {
                updatelesson: this.updateLesson
            },
            trainingscheduler: {
                deletelesson: this.onDeleteLesson
            }
        });
    },

    updateLesson: function(sender, model) {
        console.log('updateLesson');
        var lessonsService = {
            edit: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainings/' + model.trainingId + '/lessons/' + model.id,
                    method: 'PUT',
                    jsonData: entity,
                    success: function(response) {
                        deferred.resolve(response);
                    },
                    failure: function(error) {
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            }
        };
        sender.mask();
        lessonsService.edit(model)
            .then(function() {

            })
            .finally(function() {
                sender.unmask();
                sender.updateFinished();
            });
    },
    
    onDeleteLesson: function (sender, model) {
        var lessonsService = {
            delete: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/lessons/' + entity.id,
                    method: 'DELETE',
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
        lessonsService.delete(model)
        .then(function () {
            sender.unmask();
            // sender.updateFinished();
        })
        .finally(function () {
            
        });
    }
});