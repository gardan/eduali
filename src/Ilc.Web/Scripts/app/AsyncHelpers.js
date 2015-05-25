Ext.define('Ilc.AsyncHelpers', {
    singleton: true,
    
    confirmModal: function (options) {
        var deferred = Q.defer();

        options = options || {};

        Ext.MessageBox.show({
            title: 'Are you sure?',
            buttons: Ext.MessageBox.YESNO,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }
        });

        return deferred.promise;
    }
});