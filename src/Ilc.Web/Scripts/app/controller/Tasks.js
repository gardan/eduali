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
    addrfi: function (window, data) {
        console.log('addrfi executed.');
        
        window.close();
    },

        // routes functions
    list: function () {
        
    }
});