Ext.define('Ilc.view.students.component.Trainings', {
    extend: 'Ilc.grid.Trainings',
    
    initComponent: function() {

        this.store = Ext.create('Ilc.store.Trainings');;

        this.store.load({
            params: {
                studentId: this.params.id
            }
        });
        this.callParent();
    }
});