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

        me.items = [
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.listeningEntryLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'entryListeningLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.listeningExitLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'exitListeningLevel',
                anchor: '100%'
            },

            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.readingEntryLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'entryReadingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.readingExitLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'exitReadingLevel',
                anchor: '100%'
            },

            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.interactiveTalkingEntryLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'entryInteractiveTalkingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.interactiveTalkingExitLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'exitInteractiveTalkingLevel',
                anchor: '100%'
            },

            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.productiveTalkingEntryLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'entryProductiveTalkingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.productiveTalkingExitLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'exitProductiveTalkingLevel',
                anchor: '100%'
            },

            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.writingEntryLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'entryWritingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.writingExitLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'exitWritingLevel',
                anchor: '100%'
            },
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
            }
        ];

        me.addEvents(
            'addAssesment'
        );

        me.callParent(arguments);
    }
});