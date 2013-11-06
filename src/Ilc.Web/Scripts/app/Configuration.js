Ext.define('Ilc.Configuration', {
    singleton: true,

    configuration: null,

    set: function (configuration) {
        Ilc.Configuration.configuration = configuration;
    },

    get: function (cfg) {
        return Ilc.Configuration.configuration;
    },

    constructor: function () {
        
    }
});