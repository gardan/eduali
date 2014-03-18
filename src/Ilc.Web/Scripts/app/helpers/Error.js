Ext.define('Ilc.helpers.Error', {
    singleton: true,

    decodeErrorText: function (responseText) {
        var decoded = Ext.JSON.decode(responseText);
        var errors = {};

        Ext.Array.forEach(decoded.responseStatus.errors, function(err) {
            errors[err.fieldName] = {
                messages: [err.message]
            };
        });

        return errors;
    }
});