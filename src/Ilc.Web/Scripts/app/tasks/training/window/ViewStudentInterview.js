Ext.define('Ilc.tasks.training.window.ViewStudentInterview', {
    extend: 'Ilc.tasks.training.window.CreateStudentInterview',
    xtype: 'editinterviewindow',
    modal: true,

    title: Ilc.resources.Manager.getResourceString('common.view'),
    layout: 'anchor',

    student: null,
    task: null,
    interview: null,

    editComplete: function() {
        this.close();
    },

    onInterviewStoreLoad: function (interviewsStore, records) {
        var fieldsets = this.query('interviewfieldset');

        Ext.Array.forEach(fieldsets, function(fieldset) {
            var attributeName = fieldset.getAttribute().name;

            var interviewResult = Ext.Array.findBy(records[0].get('interviewResults'), function (item) {
                if (item.gradingAttribute.name == attributeName) return true;
            });

            fieldset.setGrades(interviewResult);
        });
    },

    initComponent: function () {
        var me = this;

        var interviewsStore = Ext.create('Ilc.store.Interviews', {
            studentId: me.student.get('id'),
            trainingId: me.task.get('taskObject').id,
            listeners: {
                load: me.onInterviewStoreLoad,
                scope: me
            }
        });
        
        interviewsStore.load();
        //    callback: function() {
        //        var fieldsets = me.query('interviewfieldset');
        //        console.log(fieldsets);
        //    }
        //});

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function (btn, events) {
                    var model = Ilc.utils.Forms.extractModel(me.query('textfield'));

                    model.id = me.interview.get('id');
                    me.fireEvent('editinterview', me, model);
                },
                anchor: '100%'
            },
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
            'editinterview'
        );

        me.callParent(arguments);
    }
});