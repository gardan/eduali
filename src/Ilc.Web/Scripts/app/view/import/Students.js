Ext.define('Ilc.view.import.Students', {
    extend: 'Ilc.view.import.Base',
    
    importFunction: Ext.create('Ilc.manager.Import').students,
    toolTipText: 'e.g. Company Name, email@example.com, firstname, lastname, 1991-05-06, 0745998822,',
    
    gridColumns: [
        {
            dataIndex: 'customerName',
            text: 'Customer',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'email',
            text: 'Email',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'firstName',
            text: 'Firstname',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'lastName',
            text: 'Lastname',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'birthday',
            text: 'Birthday',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            dataIndex: 'phone',
            text: 'Phone',
            editor: {
                xtype: 'textfield'
            }
        }
    ],

    bulkStore: Ext.create('Ext.data.Store', {
        fields: [
            'customerName', 'email', 'firstName', 'lastName', 'birthday', 'phone'
        ]
    }),

    loadRawStore: function (data) {
        var objectData = [];
        Ext.Array.forEach(data, function (dataItem) {
            objectData.push({
                'customerName': dataItem[0],
                'email': dataItem[1],
                'firstName': dataItem[2],
                'lastName': dataItem[3],
                'birthday': dataItem[4],
                'phone': dataItem[5]
            });
        });
        this.bulkStore.removeAll();
        this.bulkStore.loadRawData(objectData);
    }
});