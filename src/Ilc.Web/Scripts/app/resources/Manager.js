Ext.define('Ilc.resources.Manager', {
    singleton: true,
    
    getResourceString: function (name) {
        var ret = Ilc.resources.Resources.resources[name];
        if (ret == null) {
            console.debug(name + ' does not exist in the locale file.');
        }
        return ret;
    },
   
    constructor: function () {
        console.log('ResourceManager ctor called.');
    }
});