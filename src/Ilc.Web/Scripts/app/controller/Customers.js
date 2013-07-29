Ext.define('Ilc.controller.Customers', {
    extend: 'Ext.app.Controller',
    
    init: function () {
        this.control({
            'listcustomers': {
                'addCustomer': this.addCustomer
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
    
    list: function () {
        
    }
});