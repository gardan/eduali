Ext.define('Ilc.view.trainings.view.Contacts', {
    extend: 'Ilc.view.customers.contacts.List',

    xtype: 'contactstraininglist',

    enableContextMenu: false,

    columns: [
    {
        dataIndex: 'firstName',
        flex: 1,
        text: Ilc.resources.Manager.getResourceString('common.name'),
        renderer: function(value, meta, record) {
            return record.get('firstName') + record.get('lastName');
        }
    }],
    
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Add contact',
                    handler: function() {
                        
                    }
                }
            ]
        }
    ],
    
    initComponent: function() {
        var me = this;
        me.on('itemcontextmenu', me.onItemContextMenu);
        this.callParent();
    },
    
    onItemContextMenu: function (view, record, item, index, e) {
        var me = this;
        
        e.stopEvent();

        if (me.contactContextMenu == null) {
            me.contactContextMenu = Ext.create('Ext.menu.Menu', {
                items: [
                    {
                        text: 'Delete',
                        handler: function () {

                            record.destroy({
                                success: function() {
                                },
                                url: 'api/trainings/1/contacts'
                            });
                        }
                    }
                ]
            });
        }

        me.contactContextMenu.record = record.data;
        me.contactContextMenu.showAt(e.getXY());
    },
});