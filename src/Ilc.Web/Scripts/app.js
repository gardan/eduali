Ext.application({
    name: 'Ilc',
    appFolder: 'Scripts/app',

    controllers: [
        'Home',
        'Tasks',
        'Trainings',
        'Customers',
        'Students',
        'Statistics'
    ],

    requires: [
        'Ext.ux.Router'
    ],
    
    views: [
        'home.Evaluation',
        'trainings.List',
        'customers.List',
        'students.List',
        'statistics.View'
    ],  
        
    routes: {
        '/': 'home#evaluation',
        'trainings': 'trainings#list',
        'customers': 'customers#list',
        'students': 'students#list',
        'statistics': 'statistics#view'
    },

    enableRouter: true,

    launch: function () {
        Ext.create('Ilc.view.Viewport');
        
        Ext.create('Ilc.routing.Router').init();
    }
});


