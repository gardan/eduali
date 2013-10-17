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
                        title: 'General'
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
            'assignrole'
        );

        me.callParent(arguments);
    }
});