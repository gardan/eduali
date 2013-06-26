Ext.define('Ilc.view.home.Evaluation', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.grid.EvalQuestions',
        'Ilc.form.CourseForm'
    ],

    items: [
        {
            xtype: 'courseForm'    
        },
        {
            xtype: 'gridEvalQuestions',
            store: 'Questions'
        }
    ]
})