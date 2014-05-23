Ext.define('Ilc.view.roles.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'editrolewindow',

    width: 800,
    bodyPadding: 0,

    role: null,

    requires: [
        'Ilc.utils.Forms',
        'Ilc.view.roles.edit.Panel',
        'Ext.ux.form.MultiSelect'
    ],

    initComponent: function () {
        var me = this;
        
        var claimsStore = Ext.create('Ilc.store.Claims', {
            roleId: me.role.get('id')
        });

        var claimsGrid = Ext.create('Ilc.grid.Claims', {
            store: claimsStore,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Assign',
                            handler: function () {
                                var unassignedClaimsStore = Ext.create('Ilc.store.Claims');
                                unassignedClaimsStore.load({
                                    params: {
                                        roleId: me.role.get('id'),
                                        assigned: false
                                    }
                                });

                                var window = Ext.create('Ext.window.Window', {
                                    roleAssignmentComplete: function() {
                                        window.close();
                                        
                                        claimsStore.load({
                                            params: {
                                                roleId: me.role.get('id')
                                            }
                                        });
                                    },
                                    layout: 'anchor',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            // editable: false,
                                            xtype: 'multiselect',
                                            // queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'name',
                                            // multiSelect: true,
                                            store: unassignedClaimsStore,
                                            name: 'claims'
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: 'Assign',
                                            handler: function () {
                                                var inputs = window.query('multiselect');
                                                var model = Ilc.utils.Forms.extractModel(inputs);
                                                model.roleId = me.role.get('id');

                                                me.fireEvent('assignroleclaims', window, model);
                                            }
                                        },
                                        {
                                            text: Ilc.resources.Manager.getResourceString('common.cancel'),
                                            handler: function() {
                                                window.close();
                                            }
                                        }
                                    ]
                                }).show();
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
                        xtype: 'editrolepanel',
                        title: 'General',
                        role: me.role,
                        listeners: {
                            cancelclicked: function() {
                                me.close();
                            },
                            editcomplete: function () {
                                me.fireEvent('editcomplete');
                                me.close();
                            }
                        }
                    },
                    {
                        title: Ilc.resources.Manager.getResourceString('common.claims'),
                        items: [
                            claimsGrid
                        ]
                    }
                ]
            }
        ],
        claimsStore.load({
            params: {
                roleId: me.role.get('id')
            }
        });

        me.addEvents('editcomplete');

        me.callParent(arguments);
    }
});