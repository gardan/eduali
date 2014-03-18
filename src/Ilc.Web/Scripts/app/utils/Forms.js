Ext.define('Ilc.utils.Forms', {
    singleton: true,

    _addProperty: function(model, name, value) {
        var delimiter = '.';
        var splitted = name.split(delimiter);
        if (splitted.length == 1) {
            model[name] = value;
        } else {
            var newName = splitted.shift();
            var restOfPropertyName = splitted.join(delimiter);

            if (model[newName] === null || model[newName] === undefined) model[newName] = {};

            Ilc.utils.Forms._addProperty(model[newName], restOfPropertyName, value);
        }
    },

    extractModel: function(inputs) {
        var model = {};

        for (var i = 0; i < inputs.length; i++) {
            var xtype = inputs[i].getXType();
            var input = inputs[i];

            switch (xtype) {
            case 'textfield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            case 'combobox':
                if (input.multiSelect) { // multiple items
                    model[input.name] = [];
                    for (var z = 0; z < input.lastSelection.length; z++) {
                        var selectedItem = input.lastSelection[z];
                        model[input.name].push(selectedItem.data);
                    }
                } else {
                    if (input.lastSelection.length == 0) {
                        console.log("No value selected.");
                        continue;
                    }
                    var val = input.lastSelection[0].data[input.valueField];
                    Ilc.utils.Forms._addProperty(model, input.name, val);
                    // model[input.name] = input.lastSelection[0].data[input.valueField];
                }
                break;
            case 'datefield':
                var date = input.getRawValue();
                if (date) {
                    Ilc.utils.Forms._addProperty(model, input.name, moment(date).format());
                }
                break;
            case 'textareafield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            case 'checkboxfield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            case 'multislider':
                var value = input.getValue();
                Ilc.utils.Forms._addProperty(model, input.name, value);
                break;
            case 'templatedaycontainer':
                var obj = {};
                obj.startDate = '';
                obj.endDate = '';
                obj.offDay = '';

                var dateTimes = input.getDateTimes();

                obj.startDate = dateTimes[0];
                obj.endDate = dateTimes[1];
                obj.offDay = input.getOffDay();

                if (model.templateDays == null) {
                    model.templateDays = [];
                }

                model.templateDays.push(obj);
                break;
            case 'numericfield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            case 'numberfield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            default:
            }
        }

        return model;
    },

    markInvalid: function (inputs, error) {
        Ext.Array.forEach(inputs, function (textfield) {
            if (error[textfield.name] == undefined) {
                return;
            }
            textfield.markInvalid(error[textfield.name].messages);
        });
    }
});