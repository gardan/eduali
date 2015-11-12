Ext.define('Ilc.view.students.List', {
    extend: 'Ext.container.Container',
    xtype: 'liststudents',

    requires: [
        'Ilc.helpers.ColumnBuilder',
        'Ilc.AsyncHelpers'
    ],

    initColumns: function() {
        var me = this;
        var ret = [
            //{
            //    // TODO: should actually use 'templatecolumn' and a XTemplate to create the <img /> tag.
            //    dataIndex: '',
            //    text: Ilc.resources.Manager.getResourceString('common.avatar'),
            //    renderer: function (value, meta, record) {
            //        var avatarUrl = record.get('userInfo').avatarLocation;
            //        return '<img width="64" height="64" src="' + avatarUrl + '" />';
            //    }
            //},
            {
                dataIndex: 'name', // There actually isn't any column 'name', we just use it for filtering porpuses, see 'renderer' for the actual value
                text: Ilc.resources.Manager.getResourceString('common.name'),
                flex: 1,
                filter: {
                    type: 'string'
                },
                
            },
            {
                dataIndex: 'customer',
                text: Ilc.resources.Manager.getResourceString('common.customer'),
                flex: 1,
                renderer: function (value) {
                    return value.name;
                },
                filter: {
                    type: 'string'
                }
            }
        ];
        
        ret = ret.concat(Ilc.helpers.ColumnBuilder.getUserColCfg());

        ret.push(
            {
                xtype: 'actioncolumn',
                text: Ilc.resources.Manager.getResourceString('common.actions'),
                sortable: false,
                menuDisabled: true,
                items: [
                    {
                        icon: 'images/web/remove.png',
                        scope: me,
                        tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                        handler: function (grid, rowIndex, colIndex, item, e, record) {
                            Ilc.AsyncHelpers.confirmModal()
                                .then(function() {
                                    me.fireEvent('deleteStudent', me, {
                                        id: record.data.id
                                    }, {
                                        store: me.studentsStore
                                    });
                                });                            
                        }
                    }
                ]
            }
        );
        return ret;
    },

    initComponent: function () {
        var me = this;

        var studentsStore = Ext.create('Ilc.store.Students');

        me.studentsStore = studentsStore;

        var filters = {
            ftype: 'jsvfilters',
            local: false,
        };

        var columns = me.initColumns();

        var studentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentsStore,
            features: [filters],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: studentsStore,
                    dock: 'bottom',
                    displayMsg: 'Displaying students {0} - {1} of {2}'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-add',
                            cls: 'clean-button',
                            text: Ilc.resources.Manager.getResourceString('common.newStudent'),
                            handler: function () {
                                var window = Ext.create('Ilc.view.students.Create', {   // here the panel is created
                                    closeAction: 'destroy'
                                });

                                window.on('addStudent', function (sender, model) {  // here we you subscribe to listen to the event addStudent
                                    me.fireEvent('addStudent', sender, model, {     // fire the addStudent event again to the controller Students.js
                                        store: studentsStore
                                    });
                                });

                                window.on('studentadded', function () {
                                    studentsStore.reload(); // here the grid is refreshed
                                });

                                window.show();
                            }
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: Ilc.resources.Manager.getResourceString('common.studentsToday'),
                            labelWidth: 100,
                            width: 200,
                            labelAlign: 'right',
                            handler: function (checkbox, checked) {
                                var today = moment();

                                if (checked) {
                                    studentsStore.reload({
                                        params: {
                                            trainingDate: today.format('YYYY-MM-DD')
                                        }
                                    });
                                } else {
                                    studentsStore.reload({
                                        params: {
                                            trainingDate: undefined
                                        }
                                    });
                                }
                                
                            }
                        }
                    ]
                }
            ],
            columns: columns
        });

        studentsGrid.on('itemdblclick', function (grid, record) {
            Ext.ux.Router.redirect('students/' + record.get('id') + '?tab=general');
        });

        //var filteredColumns = [];

        // studentsGrid.on('filterupdate', function(feature, b) {
        //     var dataIndex = b.dataIndex;
        //     var grid = feature.grid;
        // 
        //     var cols = grid.columns;
        //     var filteringColumn = Ext.Array.findBy(cols, function(col) {
        //         return col.dataIndex == dataIndex;
        //     });
        // 
        //     var isFiltered = '' != b.inputItem.getRawValue();
        //     var el = filteringColumn.getEl();
        // 
        //     if (isFiltered) {   
        //         if (!el.hasCls('filtered-column')) {
        //             el.addCls('filtered-column');
        //             el.child('div').addCls('filtered-column');
        //             el.child('div').addClsOnOver('filtered-column-hover');
        //         }
        //     } else {
        //         if (el.hasCls('filtered-column')) {
        //             el.removeCls('filtered-column');
        //             el.child('div').removeCls('filtered-column');
        //             
        //             el.child('div').removeListener('mouseenter', null, el.child('div').dom);
        //             el.child('div').removeListener('mouseleave', null, el.child('div').dom);
        //         }
        //     }
        // });
        
        //Ext.util.Observable.capture(studentsGrid, function() {
        //    console.log(arguments);
        //});

        me.items = [
            studentsGrid
        ];

        me.addEvents(
            'addStudent',
            'editStudent',
            'deleteStudent'
        );

        me.callParent(arguments);
    }
});