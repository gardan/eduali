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
        'home.Evaluation',
        'home.Transfer',
        'home.Offer'
    ],
        
    routes: {
        '/': 'home#evaluation',
        'transfer': 'home#transfer',
        'offer': 'home#offer'
    },

    enableRouter: true,

    launch: function () {
        Ext.create('Ilc.view.Viewport');
        
        Ext.create('Ilc.routing.Router').init();
    }
});


