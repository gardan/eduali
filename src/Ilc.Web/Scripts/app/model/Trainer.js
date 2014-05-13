Ext.define('Ilc.model.Trainer', {
    extend: 'Ext.data.Model',
    
    fields: [
        'id',
        {
            name: 'name'
        },
        {
            name: 'email'
        },
        'userInfo',
        'subjects'
    ]
});