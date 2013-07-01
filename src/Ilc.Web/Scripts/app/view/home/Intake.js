Ext.define('Ilc.view.home.Intake', {
    extend: 'Ext.container.Container',
    
    layout: 'form',
    frame: 'true',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Name student'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Company name'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'City'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Phone number'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Phone student'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email student'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Language'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Date intake'
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'Course location',
            labelAlign: 'top',
            items: [
                { boxLabel: 'By phone', name: 'n3', inputValue: 1 },
                { boxLabel: 'Other', name: 'n3', inputValue: 2 },
                { boxLabel: 'At customer', name: 'n3', inputValue: 3 }
            ]
            
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Executed by'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'The offer need to be sent to Mr/Miss/Mrs'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Function'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Phone number'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email'
        },
        // Beslissingsbevoegde voor de offerte:
        // - phone student
        // TODO: i Don't understand this.
        {
            xtype: 'textfield',
            fieldLabel: ' Mr/Miss/Mrs'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Function'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Phone number'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email'
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'Email contact person',
            labelAlign: 'top',
            vertical: true,
            columns: 1,
            items: [
                { boxLabel: 'Yes', name: 'n4', inputValue: true },
                { boxLabel: 'No', name: 'n4', inputValue: false }
            ]
        },
        {
            xtype: 'checkboxgroup',
            fieldLabel: 'Responsible account manager',
            labelAlign: 'top',
            vertical: true,
            columns: 1,
            items: [
                { boxLabel: 'Frank Peeters', name: 'accountManager', inputValue: 1 },
                { boxLabel: 'Mandy Brinkman', name: 'transferType', inputValue: 2 }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: ''
        },
        {
            xtype: 'textfield',
            fieldLabel: ''
        }
    ]
});