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
                fieldLabel: 'Username',
                name: 'username'
            },
            {
                fieldLabel: 'Password',
                name: 'password'
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                name: 'userInfo.firstName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                name: 'userInfo.lastName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                name: 'userInfo.email',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                name: 'userInfo.phone',
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
                handler: function() {
                    me.close();
                }
            }
        ];


        me.addEvents(
            'createuser'
        );

        me.callParent();
    }
});