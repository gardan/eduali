Ext.define('Ilc.controller.Students', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'studenteditpanel': {
                'editStudent': this.editStudent,
            },
            'liststudents': {
                'addStudent': this.addStudent,
                'deleteStudent': this.deleteStudent
            }
        });
    },

    addStudent: function(sender, model, options) {
        var studentsService = {
            add: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/students',
                    method: 'POST',
                    jsonData: entity,
                    success: function(response) {
                        deferred.resolve(response);
                    },
                    failure: function(error) {
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            }
        };

        studentsService.add(model)
            .then(function(response) {
                var student = Ext.create('Ilc.model.Student', Ext.JSON.decode(response.responseText));
                sender.studentAdded(student);
                // options.store.load();
            })
            .finally(function() {
                // sender.close();
            });

        console.log(model);
    },

    editStudent: function(sender, model, options) {
        var studentsService = {
            edit: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/students/' + entity.id,
                    method: 'PUT',
                    jsonData: entity,
                    success: function(response) {
                        deferred.resolve(response);
                    },
                    failure: function(error) {
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            }
        };
        var myMask = new Ext.LoadMask(Ext.ComponentQuery.query('viewport')[0], { msg: "Please wait..." });
        myMask.show();
        studentsService.edit(model)
            .then(function(response) {
                sender.studentEdited();
            })
            .finally(function() {
                myMask.hide();
            });

    },

    deleteStudent: function(sender, model, options) {
        var studentsService = {
            edit: function(entity) {
                var deferred = Q.defer();

                Ext.Ajax.request({
                    url: 'api/students/' + entity.id,
                    method: 'DELETE',
                    success: function(response) {
                        deferred.resolve(response);
                    },
                    failure: function(error) {
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            }
        };

        studentsService.edit(model)
            .then(function(response) {
                options.store.load();
            })
            .finally(function() {
                sender.close();
            });
    },

    list: function() {

    },
    
    view: function () {
}
});