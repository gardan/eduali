Ext.Loader.setPath('Ext.ux', 'Scripts/app/ux');

Ext.application({
    name: 'Ilc',
    appFolder: 'Scripts/app',

    controllers: [
        'Home',
        'Tasks',
        'Trainings',
        'Customers',
        'Students',
        'Statistics',
        'Trainers',
        'Tasks'
    ],

    requires: [
        'Ext.ux.Router',
        'Ilc.helpers.AppConfig',
        'Ilc.resources.Manager'
    ],
    
    views: [
        'home.Evaluation',
        'trainings.List',
        'customers.List',
        'students.List',
        'statistics.View',
        'trainers.List',
        'tasks.List'
    ],  
        
    routes: {
        '/': 'trainings#list',
        'trainings': 'trainings#list',
        'customers': 'customers#list',
        'students': 'students#list',
        'statistics': 'statistics#view',
        'trainers': 'trainers#list',
        'tasks': 'tasks#list'
    },

    enableRouter: true,

    launch: function () {
        Ext.create('Ilc.view.Viewport');
        
        var gridCfgStore = Ext.create('Ilc.store.GridConfig', { autoLoad: false });

        gridCfgStore.on('load', function () {
            Ilc.helpers.AppConfig.gridColumnStore = gridCfgStore;
            Ext.create('Ilc.routing.Router').init();
            
            // router dispatch event has been fired before we had the change to init the Router component,
            // that is why we fire it manually from here
            Ext.History.fireEvent('change', window.location.hash.substring(1));
        });
        gridCfgStore.load();
        
        // Defaults
        Ext.window.Window.prototype.bodyPadding = 10;
        Ext.window.Window.prototype.modal = true;
    }
});


