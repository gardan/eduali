Ext.application({
    name: 'Ilc',
    appFolder: 'Scripts/app',

    controllers: [
         'Home',
         'Tasks'
    ],

    requires: [
        'Ext.ux.Router'
    ],
    
    views: [
        'home.Evaluation',
        'home.Transfer',
        'home.Offer',
        'home.Intake',
        'home.Frame',
        'tasks.List'
    ],
        
    routes: {
        '/': 'home#evaluation',
        'transfer': 'home#transfer',
        'offer': 'home#offer',
        'intake': 'home#intake',
        'frame': 'home#frame',
        'tasks': 'tasks#list'
    },

    enableRouter: true,

    launch: function () {
        Ext.create('Ilc.view.Viewport');
        
        Ext.create('Ilc.routing.Router').init();
    }
});


