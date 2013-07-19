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
            },
            'planinterviewwindow': {
                addinterviewplan: me.addinterviewplan
            }
        });

    },
    
    // training workflow state handlers
    addrfp: function (sender, data) {
        console.log('addrfp executed.');
        sender.close();
    },
    addrfi: function (sender, data) {
        console.log('addrfi executed.');

        var initalOffers = {
            add: function (obj) {
                return Q.fcall(function () {
                    return {
                        id: 1   
                    };
                });
            }
        };

        initalOffers.add(data)
        .then(function (response) {
            window.open('lightOffer/pdf/' + response.id);
            sender.close();
        });

        
    },

    addinterviewplan: function(sender, data) {
        console.log('addinterviewplan executed.');

        var interviewPlans = {
            add: function (dataObj) {
                return Q.fcall(function () {
                    return {
                        id: 1    
                    };
                });
            }
        };


        interviewPlans.add(data)
        .then(function (response) {
            // just reload the tasks
            // | just the one task returned.
        }).done(function () {
            sender.close();
        });
    },

    // routes functions
    list: function () {
        
    }
});