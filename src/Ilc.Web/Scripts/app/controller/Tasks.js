Ext.define('Ilc.controller.Tasks', {
    extend: 'Ext.app.Controller',

    init: function() {

        this.control({
            'taskslist': {
                execute: function () {
                    console.log('Action executed.');
                }
            }
        });

    },
    
    list: function () {
        
    }
});