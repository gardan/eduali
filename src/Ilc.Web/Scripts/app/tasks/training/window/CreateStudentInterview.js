﻿Ext.define('Ilc.tasks.training.window.CreateStudentInterview', {
    extend: 'Ext.window.Window',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.newInterview'),
    layout: 'anchor',

    constructor: function (args) {
        var me = this;

        var task = args.task;
        var student = args.student;
        var store = Ext.create('Ilc.tasks.training.store.Grades');

        me.items = [
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.listeningLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'listeningLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.listeningTargetLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'listeningDesiredLevel',
                anchor: '100%'
            },
            
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.readingLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'readingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.readingTargetLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'readingTargetLevel',
                anchor: '100%'
            },
            
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.interactiveTalkingLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'interactiveTalkingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.interactiveTalkingDesiredLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'interactiveTalkingDesiredLevel',
                anchor: '100%'
            },
            
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.productiveTalkingLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'productiveTalkingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.productiveTalkingTargetLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'productiveTalkingTargetLevel',
                anchor: '100%'
            },
            
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.writingLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'writingLevel',
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: store,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.writingTargetLevel'),
                queryMode: 'local',
                displayField: 'text',
                valueField: 'id',
                name: 'writingTargetLevel',
                anchor: '100%'
            },
            {
                xtype: 'textarea',
                name: 'remarks',
                anchor: '100%',
                grow: true,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.remarks')
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
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

                    model.studentId = student.get('id');
                    model.taskEntityId = task.get('id');
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