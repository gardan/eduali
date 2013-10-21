Ext.define('Ilc.view.users.Create', {
    extend: 'Ext.window.Window',

    hideAction: 'destroy',
    
    width: 400,
    layout: 'anchor',

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    requires: [
    'Ilc.utils.Forms'
    ],

    initComponent: function () {
        var me = this;

        var rolesStore = Ext.create('Ilc.store.Roles');
        rolesStore.load();

        me.items = [
            {
                fieldLabel: 'Email',
                name: 'email'
            },
            {
                fieldLabel: 'Username',
                name: 'username'
            },
            {
                fieldLabel: 'Password',
                name: 'password'
            },
            {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'roles',
                fieldLabel: 'Roles',
                store: rolesStore,
                multiSelect: true,
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.createUser'),
                handler: function () {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);

                    console.log(model);

                    me.fireEvent('createuser', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
            }
        ];


        me.addEvents(
            'createuser'
        );

        me.callParent();
    }
});