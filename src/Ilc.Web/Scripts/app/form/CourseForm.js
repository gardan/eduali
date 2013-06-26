Ext.define('Ilc.form.CourseForm', {
    extend: 'Ext.form.Panel',
    xtype: 'courseForm',

    layout: 'form',
    frame: 'true',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Student name'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Company name',
            vtype: 'email'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            vtype: 'email'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'End date'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Language'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Trainer'
        }
    ]
});