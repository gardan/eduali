Ext.define('Ilc.controller.Recovery', {
    extend: 'Ext.app.Controller',
    
    init: function() {

        this.control({
            recoverycontainer: {
                updatepassword: this.onUpdatePassword
            },
            recoverwindow: {
                recover: this.onRecover
            }
        });
    },

    onRecover: function (sender, model) {
        var recoveryService = {
            updatePassword: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/recovery',
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

        recoveryService.updatePassword(model)
        .then(function () {
            sender.updated();
        }, function (error) {

        })
        .finally(function () {

        });
    },

    onUpdatePassword: function(sender, model) {
        var recoveryService = {
            updatePassword: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/recovery/' + entity.token,
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

        recoveryService.updatePassword(model)
        .then(function () {
            sender.updated();
        }, function(error) {
            sender.failed();
        })
        .finally(function () {
            
        });
    },

    default: function() {
    }
});