Ext.define('Ilc.form.TransferBlockForm', {
    extend: 'Ext.form.Panel',
    
    xtype: 'transferblockform',
    
    layout: 'auto',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson number',
            name: 'lessonNumber'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson date',
            name: 'lessonDate'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson time',
            name: 'lessonTime'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Trainer',
            name: 'trainer'
        }
    ]
})