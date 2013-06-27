Ext.define('Ilc.view.home.Evaluation', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.grid.EvalQuestions',
        'Ilc.form.CourseForm',
        'Ilc.form.EvaluationQuestionsForm',
        'Ilc.form.EvaluationRemarksForm',
        'Ilc.form.QuestionWithPredefinedAnswers'
    ],

    items: [
        {
            xtype: 'courseForm'    
        },
        {
            xtype: 'freeQuestions'
        },
        {
            xtype: 'predefquestions',
        },
        {
            xtype: 'evalremarksform'
        },
        {
            xtype: 'button',
            text: 'Save',
            scale: 'large',
            witdh: 500
        }
    ]
})