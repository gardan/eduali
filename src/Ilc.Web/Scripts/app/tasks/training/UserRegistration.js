Ext.define('Ilc.tasks.training.UserRegistration', {
    extend: 'Ilc.tasks.training.Base',
    xtype: 'userregistrationwindow',
    
    width: 800,


    buttons: [
        {
            text: Ilc.resources.Manager.getResourceString('common.join'),
            handler: function () {
                var me = this.up('window');
                var model = {
                    taskEntityId: me.entity.get('id')
                };
                me.fireEvent('execute', me, model);
            } 
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.close'),
            handler: function () {
                this.up('window').close();
            }
        }
    ],
    
    executed: function() {
        this.fireEvent('afterexecute', this);
        this.close();
    },

    /*
        Notes: the entity property in this class is the Training itself, NOT the task record
    */
    initComponent: function() {
        var me = this;


        var store = Ext.create('Ext.data.Store', {
            fields: ['key', 'val'],
            data: [
                { key: 'Price', val: 100 }, // me.entity.get('price')
                { key: 'Location', val: 1000 } // me.entity.get('location')
            ]
        });

        me.items = [
            {
                xtype: 'grid',
                hideHeaders: true,
                columns: [
                    { dataIndex: 'key', flex: 0.5 },
                    { dataIndex: 'val', flex: 1 }
                ],
                store: store
            }
        ];
        
        me.callParent(arguments);
    }
});