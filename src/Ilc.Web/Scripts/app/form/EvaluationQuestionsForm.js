Ext.define('Ilc.form.EvaluationQuestionsForm', {
    extend: 'Ext.form.Panel',
    
    xtype: 'freeQuestions',
    
    layout: 'form',
    frame: 'true',
    
    items: [
        {
            xtype: 'textareafield',
            grow: true,
            name: 'message',
            fieldLabel: 'What did you find the most usefull during the trianing?',
            anchor: '100%',
            labelAlign: 'top',
            labelSeparator: ''
        },
        {
            xtype: 'textareafield',
            grow: true,
            name: 'message',
            fieldLabel: 'Which subject would you like to see in an eventual next training?',
            anchor: '100%',
            labelAlign: 'top',
            labelSeparator: ''
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'Would you like to receive our news letter. Please slect the desired choice',
            labelAlign: 'top',
            columns: 1,
            vertical: true,
            items: [
                {
                    boxLabel: 'Yes',
                    name: 'nl',
                    inputValue: true,
                    checked: true
                },
                {
                    boxLabel: 'No',
                    name: 'nl',
                    inputValue: false
                }
            ]
        }
    ]
})