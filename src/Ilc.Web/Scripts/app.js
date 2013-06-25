Ext.application({
    name: 'Ilc',
    appFolder: 'Scripts/app',

    controllers: [
         'Home'
    ],

    requires: [
        'Ext.ux.Router'
    ],
    
    views: [
        'home.Evaluation'
    ],
        
    routes: {
        '/': 'home#evaluation',
    },

    enableRouter: true,

    launch: function () {
        Ext.create('Ilc.view.Viewport');
        
        Ext.create('Ilc.routing.Router').init();
    }
});


