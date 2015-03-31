Ext.define('Ilc.view.import.Customers', {
    extend: 'Ilc.view.import.Base',
    
    importFunction: Ext.create('Ilc.manager.Import').customers,
    toolTipText: 'e.g. Customer ID, Customer Name, address, postcode, city, country, phone, bank name, IBAN00000000, Contact name, contact@email.com',

    gridColumns: [
        {
            dataIndex: 'customerId',
            text: Ilc.resources.Manager.getResourceString('common.customerId'),
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'name',
            text: Ilc.resources.Manager.getResourceString('common.name'),
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'billingAddress',
            text: Ilc.resources.Manager.getResourceString('common.address'),
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'postcode',
            text: Ilc.resources.Manager.getResourceString('common.postcode'),
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'city',
            text: Ilc.resources.Manager.getResourceString('common.city'),
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'country',
            text: Ilc.resources.Manager.getResourceString('common.country'),
            editor: {
                xtype: 'textfield'
            }
        },

        {
            dataIndex: 'phone',
            text: Ilc.resources.Manager.getResourceString('common.phone'),
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'bankName',
            text: Ilc.resources.Manager.getResourceString('common.bankName'),
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'bankAccount',
            text: Ilc.resources.Manager.getResourceString('common.bankAccount'),
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
            'customerId', 'name', 'billingAddress', 'postcode', 'city', 'country', 'phone', 'bankName' ,'bankAccount', 'contactName', 'contactEmail'
        ]
    }),

    loadRawStore: function(data) {
        var objectData = [];
        Ext.Array.forEach(data, function (dataItem) {
            objectData.push({
                'customerId': dataItem[0],
                'name': dataItem[1],
                'billingAddress': dataItem[2],
                'postcode': dataItem[3],
                'city': dataItem[4],
                'country': dataItem[5],
                'phone': dataItem[6],
                'bankName': dataItem[7],
                'bankAccount': dataItem[8],
                'contactName': dataItem[9],
                'contactEmail': dataItem[10]
            });
        });
        this.bulkStore.removeAll();
        this.bulkStore.loadRawData(objectData);
    }
});