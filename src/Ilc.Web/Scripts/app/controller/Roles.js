Ext.define('Ilc.controller.Roles', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            editrolewindow: {
                assignroleclaims: this.assignRoleClaim
            },
            createrolewindow: {
                'createrole': this.createRole
            },
            editrolepanel: {
                edit: this.updateRole
            }
        });
    },
    
    assignRoleClaim: function (sender, model) {
        var rolesService = {
            addClaimsToRole: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/roleclaims',
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

        rolesService.addClaimsToRole(model)
        .then(function () {

        })
        .finally(function () {
            sender.roleAssignmentComplete();
        });
    },

    createRole: function(sender, model, options) {
        var rolesService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/roles',
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

        rolesService.add(model)
        .then(function () {
            // TODO: we should refresh stores. ?
            options.rolesStore.load();
        })
        .finally(function () {
            sender.close();
        });

    },

    updateRole: function (sender, model) {
        var rolesService = {
            update: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/roles/' + model.id,
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
        rolesService.update(model)
        .then(function () {

        })
        .finally(function () {
            sender.unmask();
            sender.editComplete();
        });
    },

    list: function() {

    }
});