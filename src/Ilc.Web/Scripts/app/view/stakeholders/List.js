Ext.define('Ilc.view.stakeholders.List', {
    extend: 'Ext.grid.Panel',

    getColumns: function () {
        return [
            {
                dataIndex: 'userInfo'
            }
        ];
    },

    getStore: function (trainingId) {
        var store = Ext.create('Ilc.store.Stakeholders');
        return store;
    },

    loadStore: function (store) {
        store.load();
    },

    initComponent: function () {

        this.columns = this.getColumns();
        this.store = this.getStore(this.trainingId);
        this.loadStore(this.store);

        this.callParent(arguments);
    }
});