Ext.define('Ilc.view.home.Offer', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ilc.form.OfferForm',
        'Ilc.form.ClientOfferResponseForm'
    ],

    layout: 'form',
    frame: 'true',

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Company name',
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Location'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Date'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Reference number'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Reference number'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Subject'
        },
        {
            xtype: 'offerform'
        },
        {
            xtype: 'clientofferresponseform'
        }
    ]
});