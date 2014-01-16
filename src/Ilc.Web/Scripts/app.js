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
        'Tasks',
        'Users',
        'Roles',
        'Subjects',
        'Settings',
        'StatusDefinitions',
        'Planning',
        'Contacts',
        'Spendings',
        'Lessons',
        'Availability',
        'Templates'
    ],

    requires: [
        'Ext.ux.Router',
        'Ilc.helpers.AppConfig',
        'Ilc.resources.Manager',
        'Ilc.Configuration'
    ],
    
    views: [
        'home.Evaluation',
        'trainings.List',
        'customers.List',
        'students.List',
        'statistics.View',
        'trainers.List',
        'tasks.List',
        'users.List',
        'roles.List',
        'subjects.List',
        'settings.Default',
        'planning.Default',
        'availability.Default'
    ],  
        
    routes: {
        '/': 'trainings#list',
        'trainings': 'trainings#list',
        'customers': 'customers#list',
        'students': 'students#list',
        'statistics': 'statistics#view',
        'trainers': 'trainers#list',
        'tasks': 'tasks#list',
        'users': 'users#list',
        'roles': 'roles#list',
        'subjects': 'subjects#list',
        'settings': 'settings#default',
        'planning': 'planning#default',
        'availability': 'availability#default'
    },

    enableRouter: true,

    launch: function () {
        
        
        var gridCfgStore = Ext.create('Ilc.store.GridConfig', { autoLoad: false });

        gridCfgStore.on('load', function () {
            Ilc.helpers.AppConfig.gridColumnStore = gridCfgStore;
            Ext.create('Ilc.routing.Router').init();
            
            // router dispatch event has been fired before we had the change to init the Router component,
            // that is why we fire it manually from here
            Ext.History.fireEvent('change', window.location.hash.substring(1));
        });

        Ext.Ajax.defaultHeaders = {
            'Content-Type': 'application/json'
        };
        Ext.Ajax.request({
            url: 'api/configuration?format=json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var configuration = Ext.JSON.decode(response.responseText);
                Ilc.Configuration.set(configuration);
                
                Ext.create('Ilc.view.Viewport');

                gridCfgStore.load();
            },
            failure: function (error) {
                
            }
        });

        // Defaults
        Ext.window.Window.prototype.bodyPadding = 10;
        Ext.window.Window.prototype.modal = true;
        Ext.window.Window.prototype.hideAction = 'destroy';

        Ext.form.field.Date.prototype.format = Ilc.resources.Manager.getResourceString('formats.extjsdate');


        // Bryntum Scheduler
        Sch.preset.Manager.registerPreset('hourAndDayLarge', {
            timeColumnWidth: 60,
            rowHeight: 24,
            resourceColumnWidth: 100,
            displayDateFormat: 'G:i',
            shiftIncrement: 1,
            shiftUnit: "DAY",
            defaultSpan: 24,
            timeResolution: {
                unit: "MINUTE",
                increment: 30
            },
            headerConfig: {
                middle: {
                    unit: "HOUR",
                    align: 'center',
                    dateFormat: 'G:i a'
                },
                top: {
                    unit: "DAY",
                    align: 'center',
                    dateFormat: 'D d/m'
                }
            }
        });
    }
});


