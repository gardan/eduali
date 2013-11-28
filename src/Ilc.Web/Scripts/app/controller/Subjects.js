Ext.define('Ilc.controller.Subjects', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'listsubjectswindow': {
                'addsubject': this.addSubject
            },
            'editsubjectwindow': {
                'editsubject': this.updateSubject
            }
        });
    },

    addSubject: function(sender, model, options) {
        var subjectsService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/subjects',
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

        subjectsService.add(model)
        .then(function (response) {
            options.store.load();
        })
        .finally(function () {
            sender.close();
        });

        console.log(model);
    },

    updateSubject: function (sender, model) {
        var subjectsService = {
            update: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/subjects/' + model.id,
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
        subjectsService.update(model)
        .then(function (response) {

        })
        .finally(function () {
            sender.unmask();
            sender.editComplete();
        });
    },

    list: function() {
    }
});