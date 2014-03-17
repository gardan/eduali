Ext.define('Ilc.grid.Companies', {
    extend: 'Ext.grid.Panel',
    xtype: 'companiesgrid',

    companyUpdated: function() {

    },

    onEdit: function (editor, e) {
        var record = e.record;

        var model = record.data;

        this.fireEvent('updatecompany', this, model);
        record.commit();
        console.log(record);
    },

    initComponent: function () {

        this.addEvents(
            'updatecompany'
        );

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clickstoedit: 2,
            autoCancel: false,
            listeners: {
                edit: {
                    fn: this.onEdit,
                    scope: this
                }
            }
        });

        var textBox = {
            xtype: 'textfield'
        };

        this.plugins = [rowEditing];

        this.columns = [
            {
                dataIndex: 'id',
                text: Ilc.resources.Manager.getResourceString('common.id'),

                filter: {
                    type: 'string'
                }
            },
            {
                dataIndex: 'name',
                text: Ilc.resources.Manager.getResourceString('common.name'),
                flex: 1,
                editor: textBox,
                filter: {
                    type: 'string'
                }
            }
        ];



        this.callParent();
    }
});