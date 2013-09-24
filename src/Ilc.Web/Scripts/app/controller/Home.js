Ext.define('Ilc.controller.Home', {
    extend: 'Ext.app.Controller',
    
    stores: [
        'Questions',
        'Transfers'
    ],

    init: function () {
        var self = this;
        
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
            },
            '#transferSave': {
                'click': function (button, e) {
                    var transferModel = {};

                    var view = button.up('container');
                    
                    var textboxes = view.query('textfield');
                    for (var i = 0; i < textboxes.length; i++) {
                        var textbox = textboxes[i];
                        var name = textbox.name;
                        var value = textbox.getRawValue();
                        transferModel[name] = value;
                    }

                    var checkboxgroups = view.query('checkboxgroup');
                    for (var z = 0; z < checkboxgroups.length; z++) {
                        var checked = checkboxgroups[z].getChecked();
                        for (var x = 0; x < checked.length; x++) {
                            var checkedItem = checked[x];
                            if (transferModel[checkedItem.name] == undefined) {
                                transferModel[checkedItem.name] = [];
                            }
                            transferModel[checkedItem.name].push(checkedItem.inputValue);
                        }
                        
                    }

                    Ext.Ajax.request({
                        url: 'api/transfers',
                        method: 'POST',
                        jsonData: transferModel,
                        success: function (response) {
                            var store = self.getStore('Transfers');
                            store.load();
                        }
                    });
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

    frame: function () {
        
    },

    onMainNavClick: function (btn) {
        var routeId = '';
        if (btn.itemId == undefined) { // check if it is a menu button
            return;
        }
        routeId = btn.itemId.substring(5);
        Ext.Router.redirect(routeId === 'evaluation' ? '' : routeId);
    }
});