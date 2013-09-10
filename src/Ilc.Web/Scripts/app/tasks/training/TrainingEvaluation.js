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

        questionsStore.on('load', function (store, records) {
            var items = [];

            

            for (var i = 0; i < records.length; i++) {
                var question = records[i];

                switch (question.get('type')) {
                    case 'string':
                        var input = Ext.create('Ext.form.field.Text', {
                            labelAlign: 'top',
                            anchor: '100%',
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
                            fieldLabel: question.get('text')
                        });

                        items.push(input);
                        break;
                    default:
                        console.error('Invalid question type.');
                }

            }

            me.add(items);
            // me.setWidth(500);
            // me.doLayout();

        });

        questionsStore.load();

        me.items2 = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.done'),
                handler: function () {
                    var model = {};
                    model.taskEntityId = training.get('id');

                    me.fireEvent('addEvaluation', me, model);
                }
            }
        ];

        me.addEvents(
            'addEvaluation'
        );

        me.callParent(arguments);
    }
});