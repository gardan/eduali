Ext.define('Ilc.view.subjects.List', {
    extend: 'Ext.container.Container',
    xtype: 'listsubjectswindow',

    initComponent: function () {
        var me = this;

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
                    dock: 'top',
                    items: [
                        {
                            text: Ilc.resources.Manager.getResourceString('common.newSubject'),
                            handler: function() {
                                var window = Ext.create('Ilc.view.subjects.Create', {
                                    closeAction: 'destroy'
                                });

                                window.on('addsubject', function (sender, model) {
                                    me.fireEvent('addsubject', sender, model, {
                                        store: subjectsStore
                                    });
                                });

                                window.show();
                            }
                        }
                    ]
                }
            ]
        });

        subjectsGrid.on('itemdblclick', function(grid, record) {
            var window = Ext.create('Ilc.view.subjects.Edit', {
                role: record
            }).show();
        });

        this.items = [
            subjectsGrid
        ];

        subjectsStore.load();

        this.addEvents(
            'addsubject'
        );

        this.callParent(arguments);
    }

});