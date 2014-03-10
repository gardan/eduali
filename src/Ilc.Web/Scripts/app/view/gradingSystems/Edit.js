Ext.define('Ilc.view.gradingSystems.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'editgradingsystmwindow',

    layout: {
        type: 'anchor'
    },

    defaults: {
        anchor: '100%',
        xtype: 'textfield'
    },

    gradingSystem: null,

    buttons: [
        {
            xtype: 'button',
            text: Ilc.resources.Manager.getResourceString('common.save'),
            handler: function (btn) {
                var me = btn.up('window');
                var inputs = me.query('textfield');

                var model = Ilc.utils.Forms.extractModel(inputs);
                model.grades = [];
                model.id = me.gradingSystem.get('id');

                me.gradesStore.each(function (record) {
                    model.grades.push(record.data);
                });

                me.fireEvent('update', me, model);
            }
        },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function (btn) {
                    var me = btn.up('window');
                    me.close();
                }
            }
    ],

    gradingSystemUpdated: function() {
        this.fireEvent('afterupdate');
        this.close();
    },

    initComponent: function() {
        var me = this;

        me.gradesStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'order'],
            
            data: me.gradingSystem.get('grades')
        });
        
        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                value: me.gradingSystem.get('name')
            },
            Ext.create('Ilc.grid.Grades', {
                store: me.gradesStore,
                width: 800
            })
        ];

        me.addEvents(
            'update',
            'afterupdate'
        );
        me.callParent(arguments);
    }
});