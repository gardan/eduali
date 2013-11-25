Ext.define('Ilc.controller.Spendings', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            spendingsview: {
                updatespendings: this.updateSpendings
            }
        });
    },

    updateSpendings: function(sender, model) {
        var spendingsService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/spendings/' + entity.id,
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

        spendingsService.edit(model)
        .then(function (response) {
            // options.store.load();
        })
        .finally(function () {
            sender.editComplete();
            // sender.close();
        });
    }
});