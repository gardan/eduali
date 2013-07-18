Ext.define('Ilc.controller.Tasks', {
    extend: 'Ext.app.Controller',

    init: function() {
        var me = this;

        me.control({
            'rfpwindow': {
                addrfp: me.addrfp
            },
            'rfiwindow': {
                addrfi: me.addrfi
            }
        });

    },
    
    // training workflow state handlers
    addrfp: function (window, data) {
        console.log('addrfp executed.');
        window.close();
    },
    addrfi: function (sender, data) {
        console.log('addrfi executed.');

        var taskService = {
            updateTask: function (obj) {
                return Q.fcall(function () {
                    return {
                        id: 1   
                    };
                });
            }
        };

        taskService.updateTask(data)
        .then(function (response) {
            window.open('lightOffer/pdf/' + response.id);
            sender.close();
        });

        
    },

        // routes functions
    list: function () {
        
    }
});