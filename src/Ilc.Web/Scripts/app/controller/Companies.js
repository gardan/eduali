Ext.define('Ilc.controller.Companies', {
    extend: 'Ext.app.Controller',

    init: function () {
        this.control({
            'createcompanywindow': {
                'addcompany': this.addCompany
            },
            'companiesgrid': {
                'updatecompany': this.onUpdateCompany
            },
            'companycontainer': {
                'updatecompany': this.onUpdateCompany
            },
            'createaccountwindow': {
                'addnewaccount': this.addCompany
            }
        });
    },
    
    addCompany: function(sender, model) {
        var customerService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/companies',
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
            sender.companyAdded();
        })
        .finally(function () {

        });
    },

    onUpdateCompany: function (sender, model) {
        var companiesService = {
            update: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/companies/' + entity.id,
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

        companiesService.update(model)
        .then(function (response) {
            sender.companyUpdated();
        })
        .finally(function () {

        });
    },

    list: function () { },
    default: function () { }
});