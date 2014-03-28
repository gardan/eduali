Ext.define('Ilc.view.gradingSystems.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'editgradingsystmwindow',

    layout: {
        type: 'anchor'
    },
    width: 600,
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

        var attributesStore = Ext.create('Ilc.store.GradingAttributes');
        me.gradesStore = Ext.create('Ilc.store.Grades');

        attributesStore.loadRawData(me.gradingSystem.get('attributes'));
        me.gradesStore.loadRawData(me.gradingSystem.get('grades'));

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name',
                value: me.gradingSystem.get('name'),
                anchor: '100%'
            },
            Ext.create('Ilc.grid.Grades', {
                store: me.gradesStore,
                width: 600
            }),
            Ext.create('Ilc.view.gradingAttributes.List', {
                store: attributesStore,
                gradingSystemId: me.gradingSystem.get('id'),
                width: 600,
                listeners: {
                    'afterupdate': function() {
                        me.fireEvent('afterupdate');
                    },
                }
            })
        ];

        me.addEvents(
            'update',
            'afterupdate'
        );
        me.callParent(arguments);
    }
});