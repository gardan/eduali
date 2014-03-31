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
        'Templates',
        'Companies',
        'Interviews',
        'Evaluations',
        'GradingSystems',
        'Profile',
        'Recovery'
    ],

    requires: [
        'Ext.ux.Router',
        'Ilc.helpers.AppConfig',
        'Ilc.resources.Manager',
        'Ilc.Configuration',
        'Ilc.utils.Forms',
        'Ilc.LoginManager'
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
        'availability.Default',
        'companies.List',
        'profile.Edit',
        'recovery.Default',
        'companies.Default'
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
        'availability': 'availability#default',
        'companies': 'companies#list',
        'profile': 'profile#edit',
        'recover': 'recovery#default',
        'company': 'companies#default'
    },

    enableRouter: true,

    launch: function () {
        // Defaults
        Ext.window.Window.prototype.bodyPadding = 10;
        Ext.window.Window.prototype.modal = true;
        Ext.window.Window.prototype.hideAction = 'destroy';
        Ext.window.Window.prototype.autoScroll = true;

        Ext.form.field.Date.prototype.format = Ilc.resources.Manager.getResourceString('formats.extjsdate');

        Ext.grid.Panel.prototype.emptyText = 'No data.';

        Ext.Ajax.defaultHeaders = {
            'Content-Type': 'application/json'
        };

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

        

        Ilc.helpers.AppConfig.gridColumnStore = Ext.create('Ilc.store.GridConfig', { autoLoad: false });

        if (Ext.util.Cookies.get('LoggedIn') == 'True') {
            Ilc.Configuration.init({
                callback: function () {
                    Ext.create('Ilc.routing.Router').init();
                    Ext.create('Ilc.view.Viewport');
                    Ext.History.fireEvent('change', window.location.hash.substring(1));
                }
            });
        } else {
            Ext.create('Ilc.routing.Router').init();
            Ext.create('Ilc.view.Viewport');
        }
    }
});


