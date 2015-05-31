Ext.define('Ilc.grid.Users', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ilc.AsyncHelpers'
    ],

    features: [
        {
            ftype: 'jsvfilters',
            local: false,   // defaults to false (remote filtering)
        }
    ],

    initColumns: function () {
        var ret = [
            {
                text: Ilc.resources.Manager.getResourceString('common.name'),
                dataIndex: 'userInfo',
                flex: 1,
                renderer: function (value) {
                    return value.name;
                }
            }
        ];
        
        ret = ret.concat(Ilc.helpers.ColumnBuilder.getUserColCfg());

        ret.push({
            xtype: 'actioncolumn',
            items: [
                {
                    icon: 'images/web/remove.png',
                    tooltip: Ilc.resources.Manager.getResourceString('common.delete'),
                    handler: function (grid, rowIndex, colIndex, item, e, record) {
                        Ilc.AsyncHelpers.confirmModal()
                            .then(function() {
                                record.destroy({
                                    success: function () {
                                        console.log(arguments);
                                    },
                                    failure: function (model, response) {
                                        Ext.MessageBox.show({
                                            title: 'Error',
                                            msg: response.error.statusText,
                                            buttons: Ext.MessageBox.OK,
                                        });
                                    }
                                });
                            });
                    }
                }
            ]
        });

        return ret;
    },

    initComponent: function () {
        var me = this;

        me.columns = me.initColumns();

        me.callParent(arguments);
    }
});