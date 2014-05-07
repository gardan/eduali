Ext.define('Ilc.view.import.Trainers', {
    extend: 'Ilc.view.import.Base',

    importFunction: Ext.create('Ilc.manager.Import').trainers,

    gridColumns: [
        {
            dataIndex: 'email',
            text: 'Email',
            editor: { xtype: 'textfield' }
        },
        {
            dataIndex: 'firstName',
            text: 'Firstname',
            editor: { xtype: 'textfield' }
        },
        {
            dataIndex: 'lastName',
            text: 'Lastname',
            editor: { xtype: 'textfield' }
        },
        {
            dataIndex: 'birthday',
            text: 'Birthday',
            editor: { xtype: 'textfield' }
        },
        {
            dataIndex: 'phone',
            text: 'Phone',
            editor: { xtype: 'textfield' }
        },
        {
            dataIndex: 'subjects',
            text: 'Subjects',
            editor: { xtype: 'textfield' }
        }
    ],

    bulkStore: Ext.create('Ext.data.Store', {
        fields: [
            'email', 'firstName', 'lastName', 'birthday', 'phone', 'subjects'
        ]
    }),

    loadRawStore: function (data) {
        var objectData = [];
        Ext.Array.forEach(data, function (dataItem) {
            objectData.push({
                'email': dataItem[0],
                'firstName': dataItem[1],
                'lastName': dataItem[2],
                'birthday': dataItem[3],
                'phone': dataItem[4],
                'subjects': dataItem[5]
            });
        });
        this.bulkStore.removeAll();
        this.bulkStore.loadRawData(objectData);
    }
});