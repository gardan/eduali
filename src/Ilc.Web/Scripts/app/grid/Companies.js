Ext.define('Ilc.grid.Companies', {
    extend: 'Ext.grid.Panel',
    
    columns: [
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
            filter: {
                type: 'string'
            }
        }
    ]
});