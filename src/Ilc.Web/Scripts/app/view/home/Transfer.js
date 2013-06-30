﻿Ext.define('Ilc.view.home.Transfer', {
    extend: 'Ext.container.Container',

    requires: [
        'Ilc.form.TransferBlockForm'
    ],

    layout: 'form',
    frame: 'true',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Student name'
        },
        {
            xtype: 'transferblockform'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson transffered from'
        },
        {
            xtype: 'checkboxgroup',
            fieldLabel: 'Lesson transffered in the following',
            labelAlign: 'top',
            items: [
                { boxLabel: 'Telephone/Email', name: 'transferType', inputValue: '1' },
                { boxLabel: 'Telephone/Email', name: 'transferType', inputValue: '2' },
                { boxLabel: 'Personal/Verbal', name: 'transferType', inputValue: '3' }
            ]
        },
        {
            xtype: 'textareafield',
            grow: true,
            name: 'progressAndComments',
            fieldLabel: 'Progress / Comments',
            anchor: '100%',
            labelAlign: 'top',
            labelSeparator: ''
        },
        {
            xtype: 'textareafield',
            grow: true,
            name: 'homework',
            fieldLabel: 'Homework',
            anchor: '100%',
            labelAlign: 'top',
            labelSeparator: ''
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson transffered to'
        }
    ]
});