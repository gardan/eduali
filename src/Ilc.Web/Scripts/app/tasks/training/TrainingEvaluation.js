Ext.define('Ilc.tasks.training.TrainingEvaluation', {
    extend: 'Ext.window.Window',
    
    layout: 'anchor',
    title: Ilc.resources.Manager.getResourceString('common.trainingEval'),

    maxHeight: 400,

    autoScroll: true,

    defaults: {
        xtype: 'textfield',
        labelAlign: 'top',
        anchor: '100%',
        width: 500
    },

    constructor: function () {
        var me = this;
        var radioItems = [
            { labelAlign: 'top', name: 'rb', boxLabel: 'Totally disagree', inputValue: '1' },
            { labelAlign: 'top', name: 'rb', boxLabel: 'Disagree', inputValue: '2' },
            { labelAlign: 'top', name: 'rb', boxLabel: 'Not disagree/Not agree', inputValue: '3' },
            { labelAlign: 'top', name: 'rb', boxLabel: 'Agree', inputValue: '4' },
            { labelAlign: 'top', name: 'rb', boxLabel: 'Totally agree', inputValue: '5' },
            { labelAlign: 'top', name: 'rb', boxLabel: 'No answer', inputValue: '6' }
        ];

        me.items = [
            {
                fieldLabel: 'What did you find the most usefull during training?',
            },
            {
                fieldLabel: 'Which subject would you like to see in an eventual next training?'
            },
            {
                xtype: 'checkbox',
                fieldLabel: 'Subscribe to newsletter:'
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Het intakegesprek voorafgaand aan de training heb ik als zinvol ervaren',
                items: radioItems,
                columns: 3
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'De coördinator heeft me een goed en deskundig advies gegeven',
                items: radioItems,
                columns: 3
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'De coördinator heeft me een goed en deskundig advies gegeven',
                items: radioItems,
                columns: 3
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'De coördinator heeft me een goed en deskundig advies gegeven',
                items: radioItems,
                columns: 3
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'De coördinator heeft me een goed en deskundig advies gegeven',
                items: radioItems,
                columns: 3
            },
            {
                xtype: 'label',
                text: 'Some more questions, there are quite alot.'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Do you have suggestions, remarks, explanations?'
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.done'),
                handler: function () {
                    
                }
            }
        ];

        me.addEvents(
            'addEvaluation'
        );

        me.callParent(arguments);
    }
});