Ext.define('Ilc.view.gradingAttributes.TrainingList', {
    extend: 'Ext.grid.Panel',
    xtype: 'trainingattributeslist',

    config: {
        trainingId: null
    },

    columns: [
        {
            dataIndex: 'name',
            title: 'Name',
            flex: 1,
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Add attributes'
                }
            ]
        }
    ],

    initComponent: function() {
        var me = this;
        me.addEvents(
            'removeattribute',
            'addattribute'
        );

        this.on('itemcontextmenu', function(view, record, item, index, e) {
            e.stopEvent();

            if (!me.rowContextMenu) {
                me.rowContextMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            text: 'Delete',
                            handler: function() {
                                me.store.remove(me.rowContextMenu.record);
                                var model = {
                                    trainingId: me.getTrainingId(),
                                    gradingAttributeId: me.rowContextMenu.record.get('id')
                                };
                                me.fireEvent('removeattribute', me, model);
                            }
                        }
                    ]
                });
            }
            me.rowContextMenu.record = record;
            me.rowContextMenu.showAt(e.getXY());
        });

        this.store = Ext.create('Ilc.store.GradingAttributes');
        this.store.load({
            params: {
                trainingId: this.getTrainingId()
            }
        });

        this.callParent();
    }
});