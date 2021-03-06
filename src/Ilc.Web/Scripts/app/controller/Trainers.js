﻿Ext.define('Ilc.controller.Trainers', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'listtrainers': {
                'addTrainer': this.addTrainer,
                'editTrainer': this.editTrainer,
                'deleteTrainer': this.deleteTrainer
            },
            'edittrainerwindow': {
                'addsubjectstotrainer': this.addSubjectsToTrainer,
                'deletesubjectfromtrainer': this.deleteSubjectFromTrainer
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

        sender.mask();
        trainerService.add(model)
        .then(function (response) {
            var trainer = Ext.create('Ilc.model.Trainer', Ext.JSON.decode(response.responseText));
            sender.trainerCreated(trainer);
        })
        .finally(function () {
            sender.unmask();
        });
    },

    editTrainer: function (sender, model, options) {
        var trainersService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainers/' + entity.id,
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

        trainersService.edit(model)
        .then(function (response) {
            sender.trainerEdited();
        })
        .finally(function () {
        });
    },
    
    deleteTrainer: function(sender, model, options) {
        var trainersService = {
            edit: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainers/' + entity.id,
                    method: 'DELETE',
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

        trainersService.edit(model)
        .then(function(response) {
            options.store.load();
        })
        .fail(function (response) {
            if (response.status >= 500) return;
            if (sender.showError) {
                sender.showError(JSON.parse(response.responseText));
            }
        })
        .finally(function () {
            sender.close();
        });
    },

    addSubjectsToTrainer: function (sender, model, options) {
        var trainerService = {
            addSubjectsToTrainer: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainerssubjects',
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
        
        trainerService.addSubjectsToTrainer(model)
        .then(function (response) {
            options.parent.loadSubjects();
        })
        .finally(function () {
            sender.close();
        });
    },

    deleteSubjectFromTrainer: function(sender, model) {
        var trainerService = {
            deleteSubjectFromTrainer: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainers/' + entity.trainerId + '/subjects/' + entity.subjectId,
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

        trainerService.deleteSubjectFromTrainer(model)
        .then(function (response) {
            
        })
        .finally(function () {
            sender.subjectDeleted();
        });
    },

    list: function () {
        
    }
});