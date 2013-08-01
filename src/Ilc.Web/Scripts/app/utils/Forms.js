Ext.define('Ilc.utils.Forms', {
    singleton: true,

    extractModel: function(inputs) {
        var model = {};

        for (var i = 0; i < inputs.length; i++) {
            var xtype = inputs[i].getXType();
            var input = inputs[i];

            switch (xtype) {
                case 'textfield':
                    model[input.name] = input.getRawValue();
                    break;
                case 'combobox':
                    if (input.multiSelect) { // multiple items
                        model[input.name] = [];
                        for (var z = 0; z < input.lastSelection.length; z++) {
                            var selectedItem = input.lastSelection[z];
                            model[input.name].push(selectedItem.data);
                        }
                    } else {
                        model[input.name] = input.lastSelection[0].data[input.valueField];
                    }
                    break;
                case 'datefield':
                    var date = input.getRawValue();
                    if (date) {
                        model[input.name] = moment(date).format();
                    }
                    break;
                default:
            }
        }

        return model;
    }
    
});