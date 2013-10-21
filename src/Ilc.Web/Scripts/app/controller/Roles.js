Ext.define('Ilc.controller.Roles', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            editrolewindow: {
                assignroleclaims: function(sender, model) {
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
                        // TODO: we should refresh stores. ?
                        
                    })
                    .finally(function () {
                        sender.close();
                    });
                }
            }
        });
    },
    
    list: function() {

    }
});