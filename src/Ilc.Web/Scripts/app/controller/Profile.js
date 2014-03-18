Ext.define('Ilc.controller.Profile', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ilc.helpers.Error'
    ],

    init: function() {
        this.control({
            profile: {
                updategeneral: this.onUpdateGeneral,
                updateemail: this.onUpdateEmail,
                updatepassword: this.onUpdatePassword,
            }
        });
    },
    
    onUpdateGeneral: function(sender, model) {
        var profileService = {
            updateGeneral: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/profile/general',
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
        
        var myMask = new Ext.LoadMask(sender, { msg: "Please wait..." });
        myMask.show();
        profileService.updateGeneral(model)
        .then(function () {
            sender.updated();
        }, function (response) {
            var error = Ilc.helpers.Error.decodeErrorText(response.responseText);
            sender.updateFailed(error);
        })
        .finally(function() {
            myMask.hide();
        });
    },

    onUpdateEmail: function(sender, model) {
        var profileService = {
            updateEmail: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/profile/email',
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

        var myMask = new Ext.LoadMask(sender, { msg: "Please wait..." });
        myMask.show();
        profileService.updateEmail(model)
        .then(function () {
            sender.updated();
        }, function (response) {
            var error = Ilc.helpers.Error.decodeErrorText(response.responseText);
            sender.updateFailed(error);
        })
        .finally(function () {
            myMask.hide();
        });
    },

    onUpdatePassword: function(sender, model) {
        var profileService = {
            updatePassword: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/profile/password',
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
        var myMask = new Ext.LoadMask(sender, { msg: "Please wait..." });
        myMask.show();
        profileService.updatePassword(model)
        .then(function () {
            sender.updated();
        }, function (response) {
            var error = Ilc.helpers.Error.decodeErrorText(response.responseText);
            sender.updateFailed(error);
        })
        .finally(function () {
            myMask.hide();
        });
    },

    edit: function() {

    }
});