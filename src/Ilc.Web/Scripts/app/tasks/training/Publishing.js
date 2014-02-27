Ext.define('Ilc.tasks.training.Publishing', {
    extend: 'Ilc.tasks.training.Base',
    xtype: 'publishingwindow',

    buttons: [
        {
            text: Ilc.resources.Manager.getResourceString('common.publish'),
            handler: function () {
                var me = this.up('window');
                

                var model = {
                    publish: true,
                    taskEntityId: me.entity.get('taskObject').id
                };
                me.fireEvent('executepublish', me, model);
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.cancel'),
            handler: function() {
                var me = this.up('window');

                var model = {
                    publish: false,
                    taskEntityId: me.entity.get('taskObject').id
                };
                me.fireEvent('executepublish', me, model);
            }
        },
        '->',
        {
            text: Ilc.resources.Manager.getResourceString('common.close'),
            handler: function () {
                this.up('window').close();
            }
        }
    ],

    initComponent: function() {
        var me = this;
        console.log(me.entity.get('taskObject'));

        // // me.html = viewTpl.apply(me.entity.get('taskObject'));
        // 
        // me.html = new Ext.XTemplate(
        //     '<div><tpl for="trainer"> Trainer: {name}</tpl></div>',
        //     '<div>Price: {price}</div>',
        //     '<div><tpl for="trainer">Subject: {name}</tpl></div>',
        //     '<div>Location: {location}</div>'
        // ).apply(me.entity.get('taskObject'));

        var training = me.entity.get('taskObject');
        
        var store = Ext.create('Ext.data.Store', {
            fields: ['key', 'val'],
            data: [
                { key: 'Trainer', val: training.trainer.name },
                { key: 'Price', val: training.price },
                { key: 'Subject', val: training.subject.name },
                { key: 'Location', val: training.location }
            ]
        });

        me.items = [
            {
                xtype: 'grid',
                hideHeaders: true,
                columns: [
                    { dataIndex: 'key' },
                    { dataIndex: 'val', flex: 1 }
                ],
                store: store
            }
        ];

        me.addEvents(
            'executepublish'
        );

        me.callParent();
    }
});