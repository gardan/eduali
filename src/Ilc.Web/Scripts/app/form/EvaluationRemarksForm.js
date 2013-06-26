Ext.define('Ilc.form.EvaluationRemarksForm', {
    extend: 'Ext.form.Panel',
    xtype: 'evalremarksform',

    layout: 'form',
    frame: 'true',
    
    items: [
         {
             xtype: 'textareafield',
             grow: true,
             name: 'message',
             fieldLabel: 'Do you have suggestions, remarks, explanations',
             anchor: '100%',
             labelAlign: 'top',
             labelSeparator: ''
         }
    ]
});