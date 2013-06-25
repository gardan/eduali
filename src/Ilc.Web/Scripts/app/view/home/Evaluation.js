Ext.define('Ilc.view.home.Evaluation', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.grid.EvalQuestions'
    ],

    items: [
        {
            xtype: 'gridEvalQuestions',
            store: 'Questions'
        }
    ]
})