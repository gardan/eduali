Ext.define('Ilc.controller.Trainings', {
    extend: 'Ext.app.Controller',

    init: function () {
        var me = this;

        me.control({
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
                },
                'updatetraining': function(sender, data, options) {
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


                    trainingDataContext.update(data)
                        .then(function (response) {
                            sender.unmask();
                        });
                }
            }
        });
    },

    list: function () {

    }
});