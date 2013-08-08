﻿Ext.Loader.setPath('Ext.ux', 'Scripts/app/ux');

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
        'Trainers'
    ],

    requires: [
        'Ext.ux.Router',
        'Ilc.helpers.AppConfig'
    ],
    
    views: [
        'home.Evaluation',
        'trainings.List',
        'customers.List',
        'students.List',
        'statistics.View',
        'trainers.List'
    ],  
        
    routes: {
        '/': 'trainings#list',
        'trainings': 'trainings#list',
        'customers': 'customers#list',
        'students': 'students#list',
        'statistics': 'statistics#view',
        'trainers': 'trainers#list'
    },

    enableRouter: true,

    launch: function () {
        Ext.create('Ilc.view.Viewport');
        
        var gridCfgStore = Ext.create('Ilc.store.GridConfig', { autoLoad: false });

        gridCfgStore.on('load', function () {
            Ilc.helpers.AppConfig.gridColumnConfiguration = gridCfgStore.data;
            Ext.create('Ilc.routing.Router').init();
            Ext.History.fireEvent('change', window.location.hash.substring(1));
        });
        gridCfgStore.load();
        
    }
});


