Ext.define('Ilc.store.Customers', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'contactPerson'],
    data: [
        { id: 1, name: 'Google Inc.', contactPerson: { id: 1, name: 'Vasile Parvan' } }
    ]
});