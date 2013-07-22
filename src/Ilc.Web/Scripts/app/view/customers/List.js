﻿Ext.define('Ilc.view.customers.List', {
    extend: 'Ext.container.Container',
    
    constructor: function () {
        var me = this;

        var customersStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'contactPerson'],
            data: [
                { id: 1, name: 'Google Inc.', contactPerson: { id: 1, name: 'Vasile Parvan' } }
            ]
        });

        var customersGrid = Ext.create('Ext.grid.Panel', {
            store: customersStore,
           
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1
                },
                {
                    dataIndex: 'contactPerson',
                    text: 'Contact',
                    flex: 1,
                    renderer: function (value, metaData) {
                        return value.name;
                    }
                }
            ]

        });

        me.items = [
            {
                xtype: 'button',
                text: 'New customer'
            },
            customersGrid
        ];

        me.callParent(arguments);
    }
});