Ext.define('Ilc.form.ClientOfferResponseForm', {
    extend: 'Ext.form.Panel',

    xtype: 'clientofferresponseform',
    
    constructor: function () {

        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name organization'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Contact person'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Address'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Postal code'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Your representation'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Purchase order'
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Always use the invoice address above',
                labelAlign: 'top',
                vertical: true,
                columns: 1,
                items: [
                    { boxLabel: 'Yes', name: 'n2', inputValue: true },
                    { boxLabel: 'No', name: 'n2', inputValue: false }
                ]
            }
        ];

        this.callParent(arguments);
        
    }
});