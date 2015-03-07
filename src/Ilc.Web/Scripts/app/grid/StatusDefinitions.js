Ext.define('Ilc.grid.StatusDefinitions', {
    extend: 'Ext.grid.Panel',

    columns: [
        {
            text: Ilc.resources.Manager.getResourceString('common.name'),
            dataIndex: 'name',
            flex: 0.20
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.weight'),
            dataIndex: 'weight',
            flex: 0.80
        }
    ],

    initComponent: function () {
        var me = this;
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: Ilc.resources.Manager.getResourceString('common.newStatus'),
                        handler: function() {
                            var window = Ext.create('Ilc.view.statusDefinitions.Create').show();

                            window.on('created-status', function() {
                                me.store.reload();
                            });
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});