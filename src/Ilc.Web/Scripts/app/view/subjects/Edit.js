Ext.define('Ilc.view.subjects.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'editsubjectwindow',

    bodyPadding: 0,
    layout: 'anchor',

    subject: null,

    requires: [
        'Ilc.utils.Forms'
    ],
    width: 600,
    
    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    editComplete: function() {
        this.fireEvent('editcomplete');
        this.close();
    },

    initComponent: function () {
        var me = this;

        var documentsStore = Ext.create('Ilc.store.SubjectDocumentsStore', {
            subjectId: me.subject.get('id')
        });
        documentsStore.load();
        me.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'General',
                        layout: 'anchor',
                        defaults: { anchor: '100%' },
                        items: [
                            {
                                xtype: 'textfield',
                                padding: '5 5 0 5',
                                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                                name: 'name',
                                value: me.subject.get('name')
                            }
                        ]
                    },
                    {
                        title: 'Files',
                        items: [
                            // Ext.create('Ilc.uploader.FileManager', {
                            //     uploadUrl: 'api/subjects/' + me.subject.get('id') + '/files',
                            //     uploaderOptions: {
                            //         method: 'POST'
                            //     }
                            // }),
                            Ext.create('Ilc.grid.SubjectFiles', {
                                store: documentsStore,
                                dockedItems: [
                                    {
                                        xtype: 'toolbar',
                                        dock: 'top',
                                        items: [
                                            {
                                                text: 'Add files',
                                                handler: function () {
                                                    var uploader = Ext.create('Ilc.uploader.FileUploader', {
                                                        uploadUrl: 'api/subjects/' + me.subject.get('id') + '/files',
                                                    });
                                                    var window = Ext.create('Ext.window.Window', {
                                                        items: [
                                                            uploader
                                                        ],
                                                        listeners: {
                                                            close: function () {
                                                                documentsStore.reload();
                                                            }
                                                        },
                                                        closeAction: 'destroy'
                                                    });

                                                    window.show();
                                                }
                                            }
                                        ]
                                    }
                                ]
                            })
                        ]
                    }
                ]
            }
            
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.save'),
                handler: function() {
                    var inputs = me.query('textfield');
                    var model = Ilc.utils.Forms.extractModel(inputs);
                    model.id = me.subject.get('id');

                    me.fireEvent('editsubject', me, model);
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
            'editsubject',
            'editcomplete'
        );

        me.callParent(arguments);
    }
});