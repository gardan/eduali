Ext.define('Ilc.resources.Manager', {
    singleton: true,
    
    getResourceString: function(name) {
        return Ilc.resources.Resources.resources[name];
    },
   
    constructor: function () {
        console.log('ResourceManager ctor called.');
    }
});