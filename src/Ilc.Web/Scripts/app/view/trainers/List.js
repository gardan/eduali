Ext.define('Ilc.view.trainers.List', {
    extend: 'Ext.container.Container',
    
    constructor: function () {
        var me = this;

        var trainersStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'phone'],
            data: [
                { id: 1, name: 'I.C. Bratianu', phone: '0727297563'}
            ]
        });

        var trainersGrid = Ext.create('Ext.grid.Panel', {
            store: trainersStore,
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1
                },
                {
                    dataIndex: 'phone',
                    text: 'Phone',
                    flex: 1
                }
            ]
        });

        me.items = [
            {
                xtype: 'button',
                text: 'New trainer'
            },
            trainersGrid
        ];

        me.callParent(arguments);
    }
});