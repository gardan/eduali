Ext.define('Ilc.controller.Home', {
    extend: 'Ext.app.Controller',
    
    stores: [
       'Questions'
    ],

    init: function () {
        this.control({
            'button': {
                'click': function (button, e) {
                    // need to get every input thingy
                    var view = button.up('container');
                    
                    // all textfields, this includes the initla forms for the course 
                    // & the 2 questions at the begging
                    // & also the remarks, suggestions textbox
                    var textboxes = view.query('textfield');

                    for (var i = 0; i < textboxes.length; i++) {
                        var textbox = textboxes[i];
                        var name = textbox.name;
                        var value = textbox.getRawValue();
                    }

                    // newsletter subcription
                    var radiogroup = view.query('radiogroup')[0];
                    var checked = radiogroup.getChecked()[0];
                    var sendNewsletter = checked.inputValue;
                    
                    // grid questions
                    var grid = view.query('gridEvalQuestions')[0];
                    

                }
            }
        });
    },
    
    evaluation: function () {
        
    }
});