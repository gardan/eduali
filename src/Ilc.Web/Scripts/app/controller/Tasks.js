Ext.define('Ilc.controller.Tasks', {
    extend: 'Ext.app.Controller',

    init: function() {
        var me = this;

        me.control({
            'rfpwindow': {
                addrfp: me.addrfp
            },
            'rfiwindow': {
                addrfi: me.addrfi
            },
            'planinterviewwindow': {
                addinterviewplan: me.addinterviewplan
            },
            'interviewwindow': {
                addInterview: me.addInterview,
                allInterviewsAdded: me.addInterview
            },
            'offerwindow': {
                addOffer: me.addOffer                
            },
            'acceptedwindow': {
                addTrainingSchedule: me.addTrainingSchedule
            },
            'plannedwindow': {
                'planned.execute': me.planned
            },
            'progressEvaluationWindow': {
                addEvaluation: me.addStudentEvaluation,
                allEvaluationsAdded: me.addStudentEvaluation
            },
            'trainingevaluationwindow': {
                addEvaluation: me.addTrainingEvaluation
            }
        });

    },
    
    // training workflow state handlers
    addrfp: function(sender, data) {
        console.log('addrfp executed.');
        sender.close();
    },

    addrfi: function(sender, data) {
        console.log('addrfi executed.');

        var taskService = {
            rfi: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/rfi',
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

        taskService.rfi(data)
        .then(function (response) {
            sender.close();
        });

         // initalOffers.add(data)
         //     .then(function(response) {
         //         window.open('lightOffer/pdf/' + response.id);
         //         sender.close();
         //     });


    },

    addinterviewplan: function(sender, data) {
        console.log('addinterviewplan executed.');
        console.log(data);
        var tasksService = {
            planInterview: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/interviewPlan',
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


        tasksService.planInterview(data)
            .then(function(response) {
                // just reload the tasks
                // | just the one task returned.
            }).done(function() {
                sender.close();
            });
    },

    addInterview: function(sender, data) {
        console.log(data);
        console.log('addInterview event.');
        
        var tasksService = {
            interview: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/interview',
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

        tasksService.interview(data)
            .then(function (response) {
                // just reload the tasks
                // | just the one task returned.
            }).done(function () {
                sender.close();
            });
    },
    allInterviewsAdded: function(sender, data) {
        console.log('allInterviewsAdded called.');
        console.log(data);
    },

    addOffer: function (sender, data) {
        console.log('addOffer called.');
        console.log(data);

        var tasksService = {
            offer: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/offer',
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

        tasksService.offer(data)
            .then(function (response) {
                // just reload the tasks
                // | just the one task returned.
            }).done(function () {
                sender.close();
            });
    },
    
    addTrainingSchedule: function(sender, data) {
        console.log('addTrainingSchedule called.');
        console.log(data);
        
        var tasksService = {
            accepted: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/accepted',
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

        tasksService.accepted(data)
            .then(function (response) {
                // just reload the tasks
                // | just the one task returned.
            }).done(function () {
                sender.close();
            });
    },

    planned: function (sender, data) {
        console.log('planned called.');
        console.log(data);

        var tasksService = {
            planned: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/planned',
                    method: 'POST',
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
        
        tasksService.planned(data)
            .then(function (response) {
                // just reload the tasks
                // | just the one task returned.
            }).done(function () {
                sender.close();
            });
    },
    
    addStudentEvaluation: function (sender, data, options) {
        console.log('addStudentEvaluation called.');
        console.log(data);
        
        var tasksService = {
            progressEvaluation: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/progressevaluation',
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

        tasksService.progressEvaluation(data)
            .then(function (response) {
                // reload the students
                if (options && options.studentsStore) {
                    options.studentsStore.reload();
                }
                
                // just reload the tasks
                // | just the one task returned.
            }).done(function () {
                sender.close();
            });
    },

    addTrainingEvaluation: function (sender, data, options) {
        console.log('addTrainingEvaluation called.');
        console.log(data);

        return;

        var tasksService = {
            trainingEvaluation: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/tasks/training/trainingevaluation',
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

        tasksService.trainingEvaluation(data)
            .then(function (response) {

                // just reload the tasks
                // | just the one task returned.
            }).done(function () {
                sender.close();
            });
    },

        // routes functions
    list: function () {
        
    }
});