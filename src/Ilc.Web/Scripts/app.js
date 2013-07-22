Ext.application({
    name: 'Ilc',
    appFolder: 'Scripts/app',

    controllers: [
         'Home',
         'Tasks',
         'Trainings',
         'Customers'
    ],

    requires: [
        'Ext.ux.Router'
    ],
    
    views: [
        'home.Evaluation',
        'trainings.List',
        'customers.List'
    ],  
        
    routes: {
        '/': 'home#evaluation',
        'trainings': 'trainings#list',
        'customers': 'customers#list'
    },

    enableRouter: true,

    launch: function () {
        Ext.create('Ilc.view.Viewport');
        
        Ext.create('Ilc.routing.Router').init();
    }
});


