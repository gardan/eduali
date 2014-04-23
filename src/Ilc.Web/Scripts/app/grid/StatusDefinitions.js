Ext.define('Ilc.grid.StatusDefinitions', {
    extend: 'Ext.grid.Panel',

    columns: [
        {
            text: Ilc.resources.Manager.getResourceString('common.name'),
            dataIndex: 'name',
            flex: 0.20
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.friendlyName'),
            dataIndex: 'friendlyName',
            flex: 0.80
        }
    ],
});