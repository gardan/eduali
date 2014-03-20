Ext.define('Ilc.Configuration', {
    singleton: true,

    configuration: null,

    set: function (configuration) {
        Ilc.Configuration.configuration = configuration;
    },

    get: function () {
        return Ilc.Configuration.configuration;
    },

    getValue: function (key) {
        if (!Ilc.Configuration.configuration) {
            console.log('Configuration: ' + key + ' not found');
            return '';
        }
        return Ilc.Configuration.configuration[key];
    },

    claimExists: function (claim) {
        if (!Ilc.Configuration.configuration) return false;
        return Ext.Array.contains(Ilc.Configuration.configuration.claims, claim);
    },

    loggedIn: function () {
        return Ilc.Configuration.configuration != undefined;
    },

    init: function() {
        Ext.Ajax.request({
            url: 'api/configuration?format=json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var configuration = Ext.JSON.decode(response.responseText);
                Ilc.Configuration.set(configuration);

                var container = Ext.ComponentQuery.query('viewport')[0];
                container.initMenuButtons();
                // debugger;
            },
            failure: function (error) {

            }
        });
    },

    constructor: function () {
        
    }
});