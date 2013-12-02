Ext.define('Ilc.controller.Users', {
    extend: 'Ext.app.Controller',

    init: function () {
        var me = this;
        this.control({
            'edituserwindow': {
                'assignrole': this.assignRole,
                'unassignrole': this.removeRole,
                'updateuser': this.updateUser
            },
            'listusers': {
                'createuser': this.createUser
            }
        });
    },
    
    assignRole: function (sender, model, options) {
        console.log('fired');
        var roleAssignmentsService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/roleassignments',
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

        roleAssignmentsService.add(model)
        .then(function (response) {
            options.rolesStore.load(options.rolesLoadObj);
        })
        .finally(function () {
            sender.close();
        });
    },

    removeRole: function (sender, model) {
        console.log('fired');
        var roleAssignmentsService = {
            delete: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/roleassignments/' + entity.roleId + '/' + entity.userId,
                    method: 'DELETE',
                    // jsonData: entity,
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
        roleAssignmentsService.delete(model)
        .then(function (response) {
            
        })
        .finally(function () {
            sender.unmask();
            sender.unassignRoleComplete();
        });
    },

    updateUser: function (sender, model, options) {
        var usersService = {
            update: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/users/' + model.id,
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
        usersService.update(model)
        .then(function (response) {
            
        })
        .finally(function () {
            sender.unmask();
        });
    },

    createUser: function(sender, model, options) {
        var usersService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/users',
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

        usersService.add(model)
        .then(function (response) {
            options.usersStore.load();
        })
        .finally(function () {
            sender.close();
        });
    },

    list: function () {

    }
});