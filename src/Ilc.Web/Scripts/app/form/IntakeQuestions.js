Ext.define('Ilc.form.IntakeQuestions', {
    extend: 'Ext.form.Panel',
    
    xtype: 'intakequestions',

    fieldDefaults: {
        labelAlign: 'top',
        anchor: '100%'
    },

    items: [
        {
            xtype: 'textareafield',
            fieldLabel: 'What are the daily work activities at the company where you the targeted language needs to be used? And what is your function'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'List the previous education and other courses or trainings'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Remarks/learning style'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Target'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Preffered trainers'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Reading matterial'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Eventual additional study material'
        },
        // TODO: There is a checkbox, but no translation, so i don't know what that is about.
        {
            xtype: 'radiogroup',
            fieldLabel: 'The training need to take place at location/in Waalwijk',
            labelAlign: 'top',
            vertical: true,
            columns: 1,
            items: [
                { boxLabel: 'At location', name: 'locationChoice', inputValue: 1 },
                { boxLabel: 'In Waalwijk', name: 'locationChoice', inputValue: 0 }
            ]
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'In case of evening training',
            labelAlign: 'top',
            vertical: true,
            columns: 1,
            items: [
                { boxLabel: 'Monday', name: 'timeTraining', inputValue: 1 },
                { boxLabel: 'Wednesday', name: 'timeTraining', inputValue: 0 }
            ]
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'In case the student needs an all in arangement, does he/she have own transportation means',
            labelAlign: 'top',
            vertical: true,
            columns: 1,
            items: [
                { boxLabel: 'Yes', name: 'requireTransport', inputValue: true },
                { boxLabel: 'No', name: 'requireTransport', inputValue: false }
            ]
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'Recieved a certificate?',
            labelAlign: 'top',
            vertical: true,
            columns: 1,
            items: [
                { boxLabel: 'Yes', name: 'receivedCertificate', inputValue: true },
                { boxLabel: 'No', name: 'receivedCertificate', inputValue: false }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Date'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Date eventual mid and/or end evaluation'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Report'
        },
        {
            xtype: 'label',
            text: 'In the customized language training the focus will be on the following'
        },
        {
            xtype: 'checkboxgroup',
            fieldLabel: 'Listening capabilities',
            vertical: true,
            columns: 1,
            items: [
                { boxLabel: 'Option 1', name: 'listeningCapabilities', inputValue: 1 },
                { boxLabel: 'Option 2', name: 'listeningCapabilities', inputValue: 2 },
                { boxLabel: 'Option 3', name: 'listeningCapabilities', inputValue: 3 },
                { boxLabel: 'Option 4', name: 'listeningCapabilities', inputValue: 4 }
            ]
        }
    ]
});