Ext.define('Ilc.store.Grades', {
    extend: 'Ext.data.Store',
    
    model: 'Ilc.model.Grade',
    // fields: ['id', 'name', 'order']
    
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});