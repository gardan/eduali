Ext.define('Ilc.store.Students', {
    extend: 'Ext.data.Store',
    
    fields: ['id', 'name', 'phone'],
    data: [
        { id: 1, name: 'Gheorghe Lazar', phone: '0723775755' },
        { id: 2, name: 'Vasile Paiete', phone: '0723775755' },
        { id: 3, name: 'Eric Lippert', phone: '0723775755' },
        { id: 4, name: 'Razvan Negura', phone: '0723775755' },
        { id: 5, name: 'Paltinisan Alexandru', phone: '0723775755' }
    ]
});