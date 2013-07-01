Ext.define('Ilc.controller.Home', {
    extend: 'Ext.app.Controller',
    
    stores: [
       'Questions'
    ],

    init: function () {
        this.control({
            '#main-nav-toolbar button': {
                click: this.onMainNavClick
            },
            '#evalSave': {
                'click': function (button, e) {
                    var evalModel = {};
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
                        evalModel[name] = value;
                    }
                    
                    // newsletter subcription
                    var radiogroup = view.query('radiogroup')[0];
                    var checked = radiogroup.getChecked()[0];
                    var sendNewsletter = checked.inputValue;
                    evalModel.newsletter = sendNewsletter;

                    // radiobutton questions
                    var radioGroups = view.query('radiogroup');
                    evalModel.answers = [];
                    for (var j = 1; j < radioGroups.length ; j++) {
                        var group = radioGroups[j];
                        var checked2 = group.getChecked()[0];
                        var grade = checked2.inputValue;

                        evalModel.answers.push(grade);
                    }
                    debugger;
                }
            }
        });
    },
    
    evaluation: function () {
        
    },
    
    transfer: function () {
        
    },

    offer: function () {
        
    },

    intake: function() {
        
    },

    onMainNavClick: function (btn) {
        Ext.Router.redirect(btn.itemId === 'evaluation' ? '' : btn.itemId);
    }
});