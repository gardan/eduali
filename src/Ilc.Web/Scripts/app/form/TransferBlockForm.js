Ext.define('Ilc.form.TransferBlockForm', {
    extend: 'Ext.form.Panel',
    
    xtype: 'transferblockform',
    
    layout: 'auto',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson number'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson date'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Lesson time'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Trainer'
        }
    ]
})