Ext.define('Ilc.controller.Students', {
    extend: 'Ext.app.Controller',
    
    init: function () {
        this.control({
            'liststudents': {
                'addStudent': this.addStudent
            }
        });
    },
    
    addStudent: function (sender, model, options) {
        var studentsService = {
            add: function (entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/students',
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
        
        studentsService.add(model)
        .then(function (response) {
            options.store.load();
        })
        .finally(function () {
            sender.close();
        });

        console.log(model);
    },

    list: function() {
        
    }
});