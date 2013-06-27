Ext.define('Ilc.form.CourseForm', {
    extend: 'Ext.form.Panel',
    xtype: 'courseForm',

    layout: 'form',
    frame: 'true',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Student name',
            name: 'studentName'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Company name',
            name: 'companyName'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            vtype: 'email',
            name: 'email'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'End date',
            name: 'endDate'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Language',
            name: 'language'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Trainer',
            name: 'trainer'
        }
    ]
});