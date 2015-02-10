Ext.define('Ilc.controller.Trainings', {
    extend: 'Ext.app.Controller',

    init: function () {
        var me = this;

        me.control({
            'viewtrainingwindow': {
                'updatetraining': function (sender, data, options) {
                    var trainingDataContext = {
                        update: function (entity) {
                            var deferred = Q.defer();

                            Ext.Ajax.request({
                                url: 'api/trainings/' + data.id,
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
                    trainingDataContext.update(data)
                        .then(function (response) {
                            sender.unmask();
                            var training = Ext.create('Ilc.model.Training', Ext.JSON.decode(response.responseText));
                            sender.trainingUpdated(training);
                        })
                        .finally(function () {
                            sender.unmask();
                        });
                }
            },
            'listtrainings': {
                'addTraining': function (sender, data, options) {
                    var trainingDataContext = {
                        add: function (entity) {
                            var deferred = Q.defer();

                            Ext.Ajax.request({
                                url: 'api/trainings',
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


                    trainingDataContext.add(data)
                        .then(function (response) {
                            console.log(response);

                            options.store.load();

                            sender.close();
                        });

                    console.log('message recieved.');
                }
            },
            'trainingattributeslist': {
                'removeattribute': this.onAttributeRemove,
                'addattribute': this.onAttributeAdd
            }
        });
    },

    onAttributeRemove: function(sender, model) {
        var trainingDataContext = {
            removeAttribute: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainings/' + entity.trainingId + '/gradingAttributes/' + entity.gradingAttributeId,
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
        trainingDataContext.removeAttribute(model)
        .then(function (response) {
            sender.removed();
        })
        .finally(function () {
            sender.unmask();
        });
    },

    onAttributeAdd: function(sender, model) {
        var trainingDataContext = {
            addAttribute: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/trainings/' + entity.trainingId + '/gradingAttributes',
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
        trainingDataContext.addAttribute(model)
        .then(function (response) {
            sender.added();
        })
        .finally(function () {
            sender.unmask();
        });
    },

        /* 
        @param querystrings Object containing the querystrings
    */
    list: function () {
    }
});