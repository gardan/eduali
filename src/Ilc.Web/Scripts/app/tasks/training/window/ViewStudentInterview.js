Ext.define('Ilc.tasks.training.window.ViewStudentInterview', {
    extend: 'Ext.window.Window',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.view'),
    layout: 'anchor',

    student: null,
    task: null,
    interview: {
        listeningLevel: 1,
        targetListeningLevel: 1
    },

    initComponent: function () {
        var me = this;

        var gradingSystemId = me.task.get('taskObject').gradingSystemId;

        var interviewsStore = Ext.create('Ilc.store.Interviews', {
            studentId: me.student.get('id'),
            trainingId: me.task.get('taskObject').id
        });
        var store = Ext.create('Ilc.tasks.training.store.Grades', {
            listeners: {
                load: function(gendersStore, records) {
                    var combos = me.query('combobox');

                    Ext.Array.forEach(combos, function (combo) {
                        var gradeId = me.interview.get(combo.name);
                        var grade = Ext.Array.findBy(records, function (gradeRecord) {
                            if (gradeRecord.get('id') == gradeId) {
                                return true;
                            }
                            return false;
                        });

                        combo.select(grade);
                    });
                }
            }
        });
        interviewsStore.load({
            callback: function (records) {

                me.interview = records[0]; // There should always be a interview, this is why i didn't do any error checking
                store.load({
                    params: {
                        gradingSystemId: gradingSystemId
                    }
                });
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
                        name: 'targetListeningLevel',
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
                        name: 'targetReadingLevel',
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
                        name: 'targetInteractiveTalkingLevel',
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
                        name: 'targetProductiveTalkingLevel',
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
                        name: 'targetWritingLevel',
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
                text: Ilc.resources.Manager.getResourceString('common.close'),
                handler: function (btn, events) {
                    me.close();
                },
                anchor: '100%'
            }
        ];
        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});