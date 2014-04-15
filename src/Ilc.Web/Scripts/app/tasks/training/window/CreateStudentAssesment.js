﻿Ext.define('Ilc.tasks.training.window.CreateStudentAssesment', {
    extend: 'Ext.window.Window',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.newAssesment'),
    layout: 'anchor',
    width: 300,

    requires: [
        'Ilc.form.InterviewFieldset',
        'Ilc.utils.Forms'
    ],
    
    task: null,
    student: null,
    

    _initItems: function () {
        var me = this;
        var attributes = this.task.get('taskObject').gradingAttributes; // this.gradingSystem.get('attributes');
        var items = [];

        Ext.Array.forEach(attributes, function (attr) {
            items.push(
                {
                    xtype: 'interviewfieldset',
                    gradesStore: me.gradesStore,
                    attribute: attr,
                    name: 'assesmentResults'
                }
            );
        });

        items.push({
            xtype: 'fieldset',
            title: Ilc.resources.Manager.getResourceString('common.remarks'),
            items: [
                 {
                     xtype: 'textarea',
                     name: 'remarks',
                     anchor: '100%'
                 }
            ]
        });

        return items;
    },

    initComponent: function () {
        var me = this;

        var task = this.task;
        var student = this.student;
        var store = Ext.create('Ilc.tasks.training.store.Grades');
        this.gradesStore = store;

        me.gradesStore.loadRawData(me.grades);

        me.items = me._initItems();

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.add'),
                handler: function (btn, events) {
                    var model = {};

                    model = Ilc.utils.Forms.extractModel(me.query('interviewfieldset'));

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