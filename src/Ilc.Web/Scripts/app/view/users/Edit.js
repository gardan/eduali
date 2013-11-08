Ext.define('Ilc.view.users.Edit', {
    extend: 'Ext.window.Window',
    width: 800,
    bodyPadding: 0,

    xtype: 'edituserwindow',

    layout: 'anchor',

    defaults: {
        anchor: '100%'
    },

    hideAction: 'destroy',

    user: null,

    requires: [
        'Ilc.utils.Forms'
    ],

    initComponent: function() {
        var me = this;

        var rolesStore = Ext.create('Ilc.store.Roles');

        var rolesGrid = Ext.create('Ilc.grid.Roles', {
            store: rolesStore,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Assign role',
                            handler: function () {
                                var unassignedRolesStore = Ext.create('Ilc.store.Roles');

                                unassignedRolesStore.load({
                                    params: {
                                        assigned: false,
                                        userId: me.user.get('id')
                                    }
                                });

                                var window = Ext.create('Ext.window.Window', {
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'id',
                                            fieldLabel: 'Roles',
                                            name: 'roleId',
                                            store: unassignedRolesStore
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: 'Assign',
                                            handler: function () {
                                                var inputs = window.query('textfield');
                                                var model = Ilc.utils.Forms.extractModel(inputs);
                                                model.userId = me.user.get('id');

                                                me.fireEvent('assignrole', window, model, {
                                                    rolesStore: rolesStore,
                                                    rolesLoadObj: {
                                                        params: {
                                                            userId: me.user.get('id')
                                                        }
                                                    }
                                                });
                                            }
                                        },
                                        {
                                            text: Ilc.resources.Manager.getResourceString('common.cancel'),
                                            handler: function() {
                                                window.close();
                                            }
                                        }
                                    ]
                                });
                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'General',
                        defaults: {
                            xtype: 'textfield',
                            anchor: '100%'
                        },
                        layout: 'anchor',
                        items: [
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                                name: 'userInfo.firstName',
                                value: me.user.get('userInfo').firstName
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                                name: 'userInfo.lastName',
                                value: me.user.get('userInfo').lastName
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                                name: 'userInfo.email',
                                value: me.user.get('userInfo').email
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                                name: 'userInfo.phone',
                                value: me.user.get('userInfo').phone
                            }
                        ],
                        buttons: [
                            {
                                text: Ilc.resources.Manager.getResourceString('common.edit'),
                                handler: function(button) {
                                    var model = {};
                                    var parent = button.up().up();
                                    var inputs = parent.query('textfield');
                                    model = Ilc.utils.Forms.extractModel(inputs);
                                    model.id = me.user.get('id');

                                    me.fireEvent('updateuser', me, model);
                                }
                            },
                            {
                                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                                handler: function() {
                                    me.close();
                                }
                            }
                        ]
                    },
                    {
                        title: 'Roles',
                        items: [
                            rolesGrid
                        ]
                    }
                ]
            }
        ],
        
        rolesStore.load({
            params: {
                userId: me.user.get('id')
            }
        });

        me.addEvents(
            'assignrole',
            'updateuser'
        );

        me.callParent(arguments);
    }
});