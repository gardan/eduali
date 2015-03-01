Ext.define('Ilc.view.trainings.view.Students', {
    extend: 'Ext.window.Window',

    xtype: 'addstudenttotraining',

    layout: 'anchor',
    width: '600px',

    getButtons: function () {
        return [
            {
                xtype: 'button',
                text: 'Cancel',
                listeners: {
                    scope: this,
                    click: function() {
                        this.close();
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Add',
                listeners: {
                    scope: this,
                    click: this.onAddClick
                }
            }
        ];
    },

    getItems: function() {
        var items = [];
        
        var usersStore = Ext.create('Ilc.store.Users');

        var func = usersStore.load;

        usersStore.load = function (options) {
            options.params.claims = 'tasks-student';
            func.apply(this, arguments);
        };

        this.stakeholdersBoxSelect = Ext.create('Ext.ux.form.field.BoxSelect', {
            store: usersStore,
            displayField: 'email',
            valueField: 'id',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.students'),
            anchor: '100%',
            name: 'students'
        });

        items.push(this.stakeholdersBoxSelect);

        return items;
    },

    onAddClick: function () {
        var me = this;
        var model = Ilc.utils.Forms.extractModel(this.query('textfield'));

        var addStudentToTraining = Ext.create('Ilc.model.students.AddToTraining', {
            students: R.map(R.get('id'), model.students),
            trainingId: me.training.get('id')
        });
        addStudentToTraining.save({
            success: function () {
                me.fireEvent('added-students');
                me.close();
            },
            error: function () {

            }
        });
    },

    initComponent: function () {

        this.items = this.getItems();

        this.buttons = this.getButtons();

        this.addEvents('added-students');

        this.callParent(arguments);
    }
});