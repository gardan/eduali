Ext.define('Ilc.controller.StatusDefinitions', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            editstatusdefinitionwindow: {
                'editstatusdefinition': this.editstatusdefinition
            }
        });
    },
    
    editstatusdefinition: function(sender, model, options) {
        var statusDefinintionsService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/statusdefinitions/' + model.id,
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

        statusDefinintionsService.edit(model)
        .then(function () {
            // TODO: we should refresh stores. ?
            // options.rolesStore.load();
            options.store.load();
        })
        .finally(function () {
            sender.close();
        });
    }
});