Ext.define('Ilc.controller.Customers', {
    extend: 'Ext.app.Controller',
    
    init: function () {
        this.control({
            'listcustomers': {
                'addCustomer': this.addCustomer,
                'editCustomer': this.editCustomer,
                'deleteCustomer': this.deleteCustomer
            }
        });
    },

    addCustomer: function (sender, model, options) {
        var customerService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/customers',
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

        customerService.add(model)
        .then(function (response) {
            options.store.load();
        })
        .finally(function () {
            sender.close(); 
        });
        

        console.log(model);
    },
    
    editCustomer: function (sender, model, options) {
        var customersService = {
            edit: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/customers/' + entity.id,
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
        
        customersService.edit(model)
        .then(function (response) {
            options.store.load();
        })
        .finally(function () {
            sender.close();
        });
    },
    
    deleteCustomer: function (sender, model, options) {
        var customersService = {
            remove: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/customers/' + entity.id,
                    method: 'DELETE',
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

        customersService.remove(model)
        .then(function (response) {
            options.store.load();
        })
        .finally(function () {
            sender.close();
        });
    },

    list: function () {
        
    }
});