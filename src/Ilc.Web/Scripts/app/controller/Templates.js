Ext.define('Ilc.controller.Templates', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'edittemplatewindow': {
                'edittemplate': this.updateTemplate
            },
            'createtemplatewindow': {
                'addtemplate': this.addTemplate
            }
        });
    },
    
    addTemplate: function(sender, model) {
        var templatesService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/templates',
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

        templatesService.add(model)
        .then(function (response) {
            // options.store.load();
        })
        .finally(function () {
            sender.templateAdded();
            // sender.close();
        });
    },

    updateTemplate: function(sender, model) {
        var templatesService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/templates/' + entity.id,
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

        templatesService.edit(model)
        .then(function (response) {
            // options.store.load();
        })
        .finally(function () {
            sender.templateUpdated();
            // sender.close();
        });
    }
});