Ext.define('Ilc.view.gradingAttributes.TrainingList', {
    extend: 'Ext.grid.Panel',
    xtype: 'trainingattributeslist',

    config: {
        trainingId: null
    },

    columns: [
        {
            dataIndex: 'name',
            title: 'Name',
            flex: 1,
        }
    ],

    initComponent: function() {

        this.store = Ext.create('Ilc.store.GradingAttributes');
        this.store.load({
            params: {
                trainingId: this.getTrainingId()
            }
        });

        this.callParent();
    }
});