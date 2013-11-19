Ext.define('Ilc.controller.Contacts', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            'contactslist': {
                updatecontact: this.updateContact
            }
        });
    },
    
    updateContact: function (sender, model) {
        var contactsService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/contacts/' + entity.id,
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

        contactsService.edit(model)
        .then(function (response) {
            // options.store.load();
        })
        .finally(function () {
            sender.editComplete();
            // sender.close();
        });
    }
});