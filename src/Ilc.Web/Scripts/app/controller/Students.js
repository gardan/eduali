Ext.define('Ilc.controller.Students', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'studenteditpanel': { // this is the view:   xtype: 'studenteditpanel' in Edit.js
                'editStudent': this.editStudent, // this is event
            },
            'liststudents': { // this is the view:   xtype: 'liststudents' in List.js
                'addStudent': this.addStudent,
                'deleteStudent': this.deleteStudent
            }
        });
    },

    addStudent: function (sender, model, options) {
        var studentsService = { // this service should be somewhere else ... 
            add: function(entity) {  // transform from call back into ... then calls (see below)
                var deferred = Q.defer(); // Q is a promis library. Here we create a defered = container for a promise

                Ext.Ajax.request({
                    waitMsg: 'Adding new student ...',
                    
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
                console.log('after the ajax request in the addstudent');
                return deferred.promise; // this function returns a promise
            }
        };
        


        // studentsService.add(model).then(successHandler, failHandler)
        studentsService.add(model)
            .then(function(response) { // FOR SUCCESS ... 
                var student = Ext.create('Ilc.model.Student', Ext.JSON.decode(response.responseText));
                sender.studentAdded(student);
                // options.store.load();
            }, function (response) {  // FOR FAIL ...
                var err = JSON.parse(response.responseText);
                sender.studentAddError(err);  // here we call the function that treats creation errors from the Create.js view
            }
            )
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