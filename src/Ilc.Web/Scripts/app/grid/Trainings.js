Ext.define('Ilc.grid.Trainings', {
    extend: 'Ext.grid.Panel',
    
    columns: Ilc.helpers.GridColumns.process([
        {
            dataIndex: 'compositeId',
            text: Ilc.resources.Manager.getResourceString('common.id'),
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'status',
            flex: 1,
            text: Ilc.resources.Manager.getResourceString('common.status'),
            filter: {
                type: 'string'
            },
            renderer: function (value) {
                if (!value) return 'Invalid status, please assign';
                return value.name;
            }
        },
        {
            dataIndex: 'customer',
            flex: 1,
            text: Ilc.resources.Manager.getResourceString('common.customer'),
            renderer: function (value) {
                return value.name;
            },
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'stakeHolders',
            flex: 1,
            text: Ilc.resources.Manager.getResourceString('common.trainer'),
            renderer: function (value) {
                var ret = '';
                R.filter(function (stakeholder) {
                    if (R.filter(R.propEq('name', 'Trainer'), stakeholder.roles).length > 0) {
                        ret += stakeholder.fullName + ', ';
                    }
                    
                }, value);

                return ret.slice(0, -2);
            },
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'subject',
            text: Ilc.resources.Manager.getResourceString('common.subject'),
            flex: 1,
            renderer: function (value) {
                return value.name;
            },
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'location',
            text: Ilc.resources.Manager.getResourceString('common.location'),
            flex: 1,
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'desiredStartDate',
            text: Ilc.resources.Manager.getResourceString('common.startDate'),
            flex: 1,
            renderer: function (value) {
                return Ext.Date.format(new Date(value), 'Y-m-d');
            },
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'price',
            text: Ilc.resources.Manager.getResourceString('common.price'),
            flex: 1,
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'expenses',
            text: 'Expenses',
            flex: 1,
            filter: {
                type: 'string'
            }
        },
        {
            dataIndex: 'owners',
            text: Ilc.resources.Manager.getResourceString('common.owners'),
            flex: 1,
            sortable: false,
            renderer: function (value, metaData) {
                var ret = '';
                for (var i = 0; i < value.length; i++) {
                    var anchor = '<a>' + value[i].userInfo.name + '</a>,';
                    ret += anchor;
                }
                return ret.slice(0, ret.length - 1);
            }
        }
    ], 'trainings'),

    initComponent: function() {
        var filters = {
            ftype: 'jsvfilters',
            // encode and local configuration options defined previously for easier reuse
            // encode: true, // json encode the filter query
            local: false,   // defaults to false (remote filtering)
        };

        this.filters = [filters];
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: this.store,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: 'Displaying trainings {0} - {1} of {2}'
        }];
        this.callParent();
    }
});