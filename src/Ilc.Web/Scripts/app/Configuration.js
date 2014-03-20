Ext.define('Ilc.Configuration', {
    singleton: true,

    configuration: null,

    set: function (configuration) {
        Ilc.Configuration.configuration = configuration;
    },

    get: function () {
        return Ilc.Configuration.configuration;
    },

    claimExists: function (claim) {
        return Ext.Array.contains(Ilc.Configuration.configuration.claims, claim);
    },

    loggedIn: function () {
        return Ilc.Configuration.configuration != undefined;
    },

    constructor: function () {
        
    }
});