﻿Ext.define('Ilc.controller.Tasks', {
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
                addInterview: me.addInterview
            },
            'acceptedwindow': {
                addTrainingSchedule: me.addTrainingSchedule
            },
            'progressEvaluationWindow': {
                addEvaluation: me.addStudentEvaluation
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
            debugger;
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

        var interviewPlans = {
            add: function(dataObj) {
                return Q.fcall(function() {
                    return {
                        id: 1
                    };
                });
            }
        };


        interviewPlans.add(data)
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
        sender.close();
    },
    allInterviewsAdded: function(sender, data) {
        console.log('allInterviewsAdded called.');
        console.log(data);
    },

    addTrainingSchedule: function(sender, data) {
        console.log('addTrainingSchedule called.');
        console.log(data);
        sender.close();
    },

    addStudentEvaluation: function (sender, data, options) {
        console.log('addStudentEvaluation called.');
        console.log(data);
        sender.close();
    },

        // routes functions
    list: function () {
        
    }
});