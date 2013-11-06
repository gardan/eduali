Ext.define('Ilc.view.trainers.Edit', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.trainer'),

    requires: [
        'Ilc.utils.Forms'
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    layout: 'anchor',
    width: 600,
    bodyPadding: 0,

    constructor: function (config) {
        var me = this;

        var cfgModel = config.model;

        var subjectsStore = Ext.create('Ilc.store.Subjects');

        var subjectsGrid = Ext.create('Ext.grid.Panel', {
            store: subjectsStore,
            columns: [
                {
                    dataIndex: 'name',
                    text: Ilc.resources.Manager.getResourceString('common.name'),
                    flex: 1
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Add subject',
                            handler: function () {
                                var unassignedSubjects = Ext.create('Ilc.store.Subjects');
                                
                                unassignedSubjects.load({
                                    params: {
                                        assigned: false,
                                        trainerId: cfgModel.id
                                    }
                                });

                                var window = Ext.create('Ext.window.Window', {
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            store: ['asdas', 'asdas']
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
                        xtype: 'container',
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
                                value: cfgModel.userInfo.firstName
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                                name: 'userInfo.lastName',
                                value: cfgModel.userInfo.lastName
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                                name: 'userInfo.email',
                                value: cfgModel.userInfo.email
                            },
                            {
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                                name: 'userInfo.phone',
                                value: cfgModel.userInfo.phone
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: 'Subjects',
                        defaults: {
                            xtype: 'textfield',
                            anchor: '100%'
                        },
                        layout: 'anchor',
                        items: [
                            subjectsGrid
                        ]
                    }
                ]
            }

        ];

        me.buttons = [
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.edit'),
                handler: function (button, e) {
                    var model = {};
                    var inputs = me.query('textfield');
                    model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = cfgModel.id;

                    me.fireEvent('editTrainer', me, model);
                }
            },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'editTrainer'
        );

        subjectsStore.load({
            params: {
                trainerId: cfgModel.id
            }
        });

        me.callParent(arguments);
    }
});