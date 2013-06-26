Ext.define('Ilc.view.home.Evaluation', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.grid.EvalQuestions',
        'Ilc.form.CourseForm',
        'Ilc.form.EvaluationQuestionsForm',
        'Ilc.form.EvaluationRemarksForm'
    ],

    items: [
        {
            xtype: 'courseForm'    
        },
        {
            xtype: 'freeQuestions'
        },
        {
            xtype: 'gridEvalQuestions',
            store: 'Questions'
        },
        {
            xtype: 'evalremarksform'
        }
    ]
})