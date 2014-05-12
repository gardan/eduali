Ext.define('Ilc.view.roles.Create', {
    extend: 'Ext.window.Window',
    xtype: 'createrolewindow',

    width: 400,
    layout: 'anchor',
    title: Ilc.resources.Manager.getResourceString('view.roles.create.title'),

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    requires: [
        'Ilc.utils.Forms'
    ],

    rolesStore: null,

    initComponent: function() {
        var me = this;

        var claimsStore = Ext.create('Ilc.store.Claims').load();

        me.items = [
            {
                fieldLabel: 'Name',
                name: 'name'
            },
            {
                editable: false,
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'name',
                multiSelect: true,
                store: claimsStore,
                name: 'claims',
                fieldLabel: 'Claims'
            }
        ];

        me.buttons = [
            {
                text: 'Create',
                handler: function () {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);

                    console.log(model);
                    me.fireEvent('createrole', me, model, {
                        rolesStore: me.rolesStore
                    });
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
            'createrole'
        );

        me.callParent();
    }
});