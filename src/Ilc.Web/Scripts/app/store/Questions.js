Ext.define('Ilc.store.Questions', {
    extend: 'Ext.data.Store',
    
    model: 'Ilc.model.EvalQuestion',
    
    data: [
        {
            id: 1,
            question: 'Question Numero 1',
            'stronglyDisagree': {
                name: 'stronglyDisagree',
                value: false
            }, 
            'disagree': false, 
            'notEven': false, 
            'once': false, 
            'fullyAgree': false, 
            'notAvailable': false
        },
        {
            id: 2,
            question: 'Question Numero 2',
            'stronglyDisagree': false,
            'disagree': false,
            'notEven': false,
            'once': false,
            'fullyAgree': false,
            'notAvailable': false
        }
    ]
});