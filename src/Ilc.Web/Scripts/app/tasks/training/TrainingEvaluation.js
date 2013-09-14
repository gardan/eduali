Ext.define('Ilc.tasks.training.TrainingEvaluation', {
    extend: 'Ext.window.Window',
    
    xtype: 'trainingevaluationwindow',

    layout: 'anchor',
    title: Ilc.resources.Manager.getResourceString('common.trainingEval'),

    maxHeight: 400,
    width: 500,
    autoScroll: true,

    defaults: {
        xtype: 'textfield',
        labelAlign: 'top',
        anchor: '100%',
        width: 500
    },

    constructor: function (args) {
        var me = this;

        var training = args.entity;

        var questionsStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'text', 'type', 'answers'],
            
            proxy: {
                type: 'rest',
                url: 'api/questions',
                extraParams: {
                    format: 'json'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalRecords'
                }
            }
        });

        questionsStore.on('load', function(store, records) {
            var items = [];

            var afterRender = function(cmp) {
                cmp.getEl().set({
                    'data-questionid': cmp.initialConfig['dataQuestionId']
                });
            };


            for (var i = 0; i < records.length; i++) {
                var question = records[i];
                var questionId = question.get('id');
                
                switch (question.get('type')) {
                    case 'string':
                        var input = Ext.create('Ext.form.field.Text', {
                            labelAlign: 'top',
                            anchor: '100%',
                            dataQuestionId: questionId,
                            listeners: {
                                afterrender: afterRender
                            },
                            width: 500,
                            fieldLabel: question.get('text')
                        });

                        items.push(input);
                        break;
                    case 'radiogroup':
                        var radioItems = [];

                        Ext.Array.forEach(question.get('answers'), function (answer) {
                            radioItems.push({
                                labelAlign: 'top',
                                name: question.get('id'),
                                boxLabel: answer.text,
                                inputValue: answer.id
                            });
                        });

                        var input = Ext.create('Ext.form.RadioGroup', {
                            labelAlign: 'top',
                            anchor: '100%',
                            width: 500,
                            dataQuestionId: questionId,
                            listeners: {
                                afterrender: afterRender
                            },
                            items: radioItems,
                            fieldLabel: question.get('text'),
                            columns: 3
                        });

                        items.push(input);
                        break;
                    case 'checkbox':
                        var input = Ext.create('Ext.form.field.Checkbox', {
                            labelAlign: 'top',
                            anchor: '100%',
                            width: 500,
                            dataQuestionId: questionId,
                            listeners: {
                                afterrender: afterRender
                            },
                            fieldLabel: question.get('text')
                        });

                        items.push(input);
                        break;
                    default:
                        console.error('Invalid question type.');
                }

            }

            items.push(Ext.create('Ext.button.Button', {
                text: Ilc.resources.Manager.getResourceString('common.done'),
                handler: function () {
                    var model = {};
                    model.taskEntityId = training.get('id');
                    model.stringAnswers = [];
                    model.radiogroupAnswers = [];
                    model.checkboxAnswers = [];

                    var textfields = me.query('textfield');
                    var radiogroups = me.query('radiogroup');
                    var checkboxes = me.query('checkbox(true)');

                    for (var j = 0; j < textfields.length; j++) {
                        var answer = textfields[j].getRawValue();
                        model.stringAnswers.push({
                            text: answer,
                            questionId: textfields[j].getEl().getAttribute('data-questionId')
                        });
                    }

                    for (var k = 0; k < radiogroups.length; k++) {
                        var checkbox = radiogroups[k].getChecked()[0];
                        model.radiogroupAnswers.push({
                            questionId: radiogroups[k].getEl().getAttribute('data-questionId'),
                            answerId: checkbox.inputValue
                        });
                    }

                    for (var l = 0; l < checkboxes.length; l++) {

                        model.checkboxAnswers.push({
                            questionId: checkboxes[l].getEl().getAttribute('data-questionId'),
                            checked: checkboxes[l].getValue()
                        });
                    }

                    me.fireEvent('addEvaluation', me, model);
                }
            }));
            me.add(items);
        });

        questionsStore.load();

        me.addEvents(
            'addEvaluation'
        );

        me.callParent(arguments);
    }
});