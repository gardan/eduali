Ext.define('Ilc.tasks.training.window.ViewStudentAssesment', {
    extend: 'Ilc.tasks.training.window.CreateStudentAssesment',
    
    onAssesmentsStoreLoad: function(store, records) {
        var fieldsets = this.query('interviewfieldset');
        this.assesment = records[0];
        
        Ext.Array.forEach(fieldsets, function (fieldset) {
            var attributeName = fieldset.getAttribute().name;

            var assesmentResult = Ext.Array.findBy(records[0].get('assesmentResults'), function (item) {
                if (item.gradingAttribute.name == attributeName) return true;
            });

            fieldset.setGrades(assesmentResult);
        });
    },

    initComponent: function () {
        var me = this;

        var interviewsStore = Ext.create('Ilc.store.Assesments', {
            studentId: me.student.get('id'),
            trainingId: me.task.get('taskObject').id,
            listeners: {
                load: me.onAssesmentsStoreLoad,
                scope: me
            }
        });
        interviewsStore.load();
        
        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function (btn, events) {
                    var model = Ilc.utils.Forms.extractModel(me.query('interviewfieldset'));

                    model.id = me.assesment.get('id');

                    console.log(model);
                    // me.fireEvent('editassesment', me, model);
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

        this.callParent();
    }
});