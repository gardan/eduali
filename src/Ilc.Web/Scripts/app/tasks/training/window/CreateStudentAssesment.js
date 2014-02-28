Ext.define('Ilc.tasks.training.window.CreateStudentAssesment', {
    extend: 'Ext.window.Window',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.newAssesment'),
    layout: 'anchor',

    requires: [
        'Ilc.utils.Forms'
    ],

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
                        name: 'entryListeningLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'exitListeningLevel',
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
                        name: 'entryReadingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'exitReadingLevel',
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
                        name: 'entryInteractiveTalkingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'exitInteractiveTalkingLevel',
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
                        name: 'entryProductiveTalkingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'exitProductiveTalkingLevel',
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
                        name: 'entryWritingLevel',
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        store: store,
                        fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name: 'exitWritingLevel',
                        anchor: '100%'
                    }
                ]
            }
        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.add'),
                handler: function (btn, events) {
                    var model = {};

                    model = Ilc.utils.Forms.extractModel(me.query('textfield'));

                    model.studentId = student.get('id');
                    model.taskEntityId = task.get('id');
                    me.fireEvent('addAssesment', me, model);
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
            'addAssesment'
        );

        me.callParent(arguments);
    }
});