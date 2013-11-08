Ext.define('Ilc.tasks.training.window.CreateStudentInterview', {
    extend: 'Ext.window.Window',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.newInterview'),
    layout: 'anchor',
    width: 300,

    gradingSystemId: null,

    constructor: function (args) {
        var me = this;

        var task = args.task;
        var student = args.student;
        var store = Ext.create('Ilc.tasks.training.store.Grades');

        store.load({
            params: {
                gradingSystemId: task.get('taskObject').gradingSystemId
            }
        });

        me.items = [
            {
                xtype: 'fieldset',
                title: Ilc.resources.Manager.getResourceString('common.listening'),
                items: [
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.level'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'listeningLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'listeningDesiredLevel',
                        anchor: '100%'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: Ilc.resources.Manager.getResourceString('common.reading'),
                items: [
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.level'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'readingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'readingTargetLevel',
                        anchor: '100%'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: Ilc.resources.Manager.getResourceString('common.interactiveTalking'),
                items: [
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.level'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'interactiveTalkingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'interactiveTalkingDesiredLevel',
                        anchor: '100%'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: Ilc.resources.Manager.getResourceString('common.productiveTalking'),
                items: [
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.level'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'productiveTalkingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'productiveTalkingTargetLevel',
                        anchor: '100%'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: Ilc.resources.Manager.getResourceString('common.writing'),
                items: [
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.level'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'writingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'writingTargetLevel',
                        anchor: '100%'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: Ilc.resources.Manager.getResourceString('common.remarks'),
                items: [
                     {
                         xtype: 'textarea',
                         name: 'remarks',
                         anchor: '100%'
                     }
                ]
            }
        ];
        
        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function (btn, events) {
                    var model = {};
                    // example: 
                    // {
                    //     listening: { currentLevel: 1, desiredLevel: 4 },
                    //     reading: { currentLevel: 1, desiredLevel: 4 },
                    //     productiveSpeaking: { currentLevel: 1, desiredLevel: 4 },
                    //     writing: { currentLevel: 1, desiredLevel: 4 }
                    // };

                    model = Ilc.utils.Forms.extractModel(me.query('textfield'));

                    model.studentId = student.get('id');
                    model.taskEntityId = task.get('id');
                    me.fireEvent('addInterview', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function() {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});