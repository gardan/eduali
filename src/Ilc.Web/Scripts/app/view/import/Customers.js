Ext.define('Ilc.view.import.Customers', {
    extend: 'Ilc.view.import.Base',
    
    importFunction: Ext.create('Ilc.manager.Import').customers,
    toolTipText: 'e.g. Company Name,IBAN00000000,Address, Contact name, contact@email.com',

    gridColumns: [
        {
            dataIndex: 'name',
            text: 'Name',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'bankAccount',
            text: 'Bank account',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'billingAddress',
            text: 'Address',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'contactName',
            text: 'Contact name',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'contactEmail',
            text: 'Contact email',
            editor: {
                xtype: 'textfield'
            }
        }
    ],
    
    bulkStore: Ext.create('Ext.data.Store', {
        fields: [
            'name', 'bankAccount', 'billingAddress', 'contactName', 'contactEmail'
        ]
    }),

    loadRawStore: function(data) {
        var objectData = [];
        Ext.Array.forEach(data, function (dataItem) {
            objectData.push({
                'name': dataItem[0],
                'bankAccount': dataItem[1],
                'billingAddress': dataItem[2],
                'contactName': dataItem[3],
                'contactEmail': dataItem[4]
            });
        });
        this.bulkStore.removeAll();
        this.bulkStore.loadRawData(objectData);
    }
});