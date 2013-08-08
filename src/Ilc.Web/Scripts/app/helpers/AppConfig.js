Ext.define('Ilc.helpers.AppConfig', {
    singleton: true,
    
    gridColumnConfiguration: null,

    getGridColumConfigByName: function (gridName) {
        // return {
        //     data: {
        //         grid: 'trainings',
        //         columnConfig: JSON.stringify({
        //             status: { order: 2, hidden: false },
        //             customer: { order: 1, hidden: false },
        //             trainer: { order: 0, hidden: false },
        //             subject: { order: 3, hidden: false },
        //             owners: { order: 4, hidden: false }
        //         })
        //     }
        // };
        return Ilc.helpers.AppConfig.gridColumnConfiguration.findBy(function (record) {
            var name = record.get('grid');
            return name == gridName;
        });
    }
});