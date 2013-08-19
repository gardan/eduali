Ext.define('Ilc.tasks.training.window.CreateStudentInterview', {
    extend: 'Ext.window.Window',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.newInterview'),
    layout: 'anchor',

    constructor: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            fields: ['text', 'order'],
            data: {
                data: [
                    { id: 1, text: 'A1', order: 1 },
                    { id: 2, text: 'A2', order: 2 },
                    { id: 3, text: 'B1', order: 3 },
                    { id: 4, text: 'B2', order: 4 },
                    { id: 5, text: 'C1', order: 5 },
                    { id: 6, text: 'C2', order: 6 }
                ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        me.items = [
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.listeningLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'listening.currentLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.listeningTargetLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'listening.desiredLevel',
                anchor: '100%'
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.add'),
                handler: function(btn, events) {
                    var model = {};
                    // example: 
                    // {
                    //     listening: { currentLevel: 1, desiredLevel: 4 },
                    //     reading: { currentLevel: 1, desiredLevel: 4 },
                    //     productiveSpeaking: { currentLevel: 1, desiredLevel: 4 },
                    //     writing: { currentLevel: 1, desiredLevel: 4 }
                    // };

                    model = Ilc.utils.Forms.extractModel(me.query('textfield'));
                    me.fireEvent('addInterview', me, model);
                }
            }
        ];

        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});