﻿Ext.define('Ilc.utils.Forms', {
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
                
            case 'comboboxselect':
            case 'combobox':
                if (input.multiSelect) { // multiple items
                    model[input.name] = [];
                    if (!input.lastSelection) continue;
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
            case 'multiselectfield':
                var data = input.lastValue;
                var ret = [];
                Ext.Array.forEach(data, function(claim) {
                    ret.push({
                        name: claim
                    });
                });
                Ilc.utils.Forms._addProperty(model, input.name, ret);
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
            case 'colorfield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            case 'numericfield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            case 'numberfield':
                Ilc.utils.Forms._addProperty(model, input.name, input.getRawValue());
                break;
            case 'interviewfieldset':
                // e.g.
                // {
                //     interviewResults: [
                //         {
                //             gradingAttributeId: 1,
                //             currentGradeId: 1,
                //             targetGradeId: 2
                //         }
                //     ]
                // };

                var result = {
                    gradingAttributeId: input.getAttribute().id,
                    currentGradeId: input.getCurrentGradeId(),
                    targetGradeId: input.getTargetGradeId()
                };

                if (model[input.getName()] == null) {
                    model[input.getName()] = [];
                }
                model[input.getName()].push(result);

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