Ext.define('Ilc.tasks.training.window.CreateStudentInterview', {
    extend: 'Ext.window.Window',
    modal: true,

    requires: [
        'Ilc.form.InterviewFieldset'
    ],

    autoScroll: true,

    title: Ilc.resources.Manager.getResourceString('common.newInterview'),
    layout: 'anchor',
    width: 300,

    gradingSystemId: null,
    gradesStore: null,
    gradingSystem: null,
    task: null,
   
    _initItems: function () {
        var me = this;
        var attributes = this.task.get('taskObject').gradingAttributes; // this.gradingSystem.get('attributes');
        var items = [];

        Ext.Array.forEach(attributes, function(attr) {
            items.push(
                {
                    xtype: 'interviewfieldset',
                    gradesStore: me.gradesStore,
                    attribute: attr,
                    name: 'interviewResults'
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

    buttons: [
        {
            xtype: 'button',
            text: Ilc.resources.Manager.getResourceString('common.save'),
            handler: function (btn, events) {
                var me = btn.up('window');
                var model = {};
                // var example =
                // {
                //     interviewResults: [
                //         {
                //             gradingAttributeId: 1,
                //             currentGradeId: 1,
                //             targetGradeId: 2
                //         }
                //     ]
                // };

                model = Ilc.utils.Forms.extractModel(me.query('interviewfieldset'));

                model.studentId = me.student.get('id');
                model.taskEntityId = me.task.get('id');
                console.log(model);
                me.fireEvent('addInterview', me, model);
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.cancel'),
            handler: function () {
                var me = btn.up('window');
                me.close();
            }
        }
    ],

    initComponent: function () {
        var me = this;
        
        var store = Ext.create('Ilc.tasks.training.store.Grades');
        this.gradesStore = store;
        
        me.gradesStore.loadRawData(me.grades);

        this.items = me._initItems();
        
        me.addEvents(
            'addInterview'
        );

        me.callParent(arguments);
    }
});