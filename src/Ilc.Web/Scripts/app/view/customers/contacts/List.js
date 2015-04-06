Ext.define('Ilc.view.customers.contacts.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'contactslist',

    columns: [
        {
            dataIndex: 'firstName',
            flex: 1,
            text: Ilc.resources.Manager.getResourceString('common.name'),
            renderer: function (value, meta, record) {
                return record.get('firstName') + ' ' + record.get('lastName');
            }
        },
        {
            flex: 1,
            xtype: 'booleancolumn',
            text: Ilc.resources.Manager.getResourceString('common.main'),
            dataIndex: 'isMain',
            trueText: Ilc.resources.Manager.getResourceString('common.yes'),
            falseText: Ilc.resources.Manager.getResourceString('common.no')
        },
        {
            flex: 1,
            xtype: 'booleancolumn',
            text: Ilc.resources.Manager.getResourceString('common.trainingContact'),
            dataIndex: 'isTrainingContact',
            trueText: Ilc.resources.Manager.getResourceString('common.yes'),
            falseText: Ilc.resources.Manager.getResourceString('common.no')
        },
        {
            dataIndex: 'user',
            flex: 1,
            text: Ilc.resources.Manager.getResourceString('common.phone'),
            renderer: function (value, meta, record) {
                return value.userInfo.phone;
            }
        },
        {
            dataIndex: 'user',
            flex: 1,
            text: Ilc.resources.Manager.getResourceString('common.email'),
            renderer: function (value, meta, record) {
                return value.email;
            }
        }
    ],

    onItemContextMenu: function (view, record, item, index, e) {
        e.stopEvent();

        var grid = view.up();
        var ctxMenu = grid.contactContextMenu;
        if (ctxMenu == null) {
            ctxMenu = Ext.create('Ext.menu.Menu', {
                items: [
                    {
                        text: 'Toggle main contact'
                    },
                    {
                        text: 'Toggle training contact'
                    }
                ]
            });
            grid.contactContextMenu = ctxMenu;
        }

        var model = record.data;

        ctxMenu.items.items[0].handler = function () {
            model.isMain = true;
            grid.fireEvent('updatecontact', grid, model);
        };

        ctxMenu.items.items[1].handler = function () {
            model.isTrainingContact = !record.get('isTrainingContact');
            grid.fireEvent('updatecontact', grid, model);
        };

        ctxMenu.showAt(e.getXY());
    },

    contactContextMenu: null,
    editComplete: function () {
        this.fireEvent('updatecomplete', this);
    },

    config: {
        enableContextMenu: true
    },

    initComponent: function () {
        var me = this;

        if (me.enableContextMenu) {
            me.on('itemcontextmenu', me.onItemContextMenu);
        }

        me.addEvents(
            'updatecontact',
            'updatecomplete'
        );

        me.callParent(arguments);
    }
});