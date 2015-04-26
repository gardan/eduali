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
        'Recovery',
        'Offers'
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
        'students.View',
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
        'companies.Default',
        'recovery.InitAccount',
        'offers.List',
        'offers.Create',
        'offers.Edit'
    ],  
        
    routes: {
        '/': 'trainings#list',
        'trainings': 'trainings#list',
        'customers': 'customers#list',
        'students': 'students#list',
        'students/:id': 'students#view',
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
        'company': 'companies#default',
        'initaccount': 'recovery#initAccount',
        'offers': 'offers#list',
        'offers/create': 'offers#create',
        'offers/:id': 'offers#edit'
    },

    enableRouter: true,

    launch: function () {
        R.propEqDeep = R.curry(function(propPath, value, obj) {
            try {
                return eval('obj.' + propPath) === value;
            } catch(e) {
                return undefined;
            } 
        });

        // Defaults
        Ext.window.Window.prototype.bodyPadding = 10;
        Ext.window.Window.prototype.modal = true;
        Ext.window.Window.prototype.hideAction = 'destroy';

        Ext.form.field.Date.prototype.format = Ilc.resources.Manager.getResourceString('formats.extjsdate');

        Ext.grid.Panel.prototype.emptyText = 'No data.';
        Ext.grid.Panel.prototype.deferEmptyText = false;
        
        Ext.view.View.prototype.emptyText = 'No data.';
        Ext.view.View.prototype.deferEmptyText = false;

        Ext.panel.AbstractPanel.prototype.getErrors = function (fields, obj) {
            var ret = {};
            R.forEach(function (key) {
                var value = eval('obj.' + key);
                var isValid = !(
                    R.propEqDeep(key, undefined, obj) ||
                    R.propEqDeep(key, null, obj) || 
                    R.propEqDeep(key, '', obj)
                );
                if (R.isArrayLike(value)) {
                    isValid = value.length > 0;
                }
                if (isValid) return;

                ret[key] = 'Value is required.';

            }, fields);

            return ret;
        };

        Ext.panel.AbstractPanel.prototype.markAsInvalid = function (errors, textboxes) {
            R.forEach(function(key) {
                var error = errors[key];
                var textbox = R.find(R.propEq('name', key), textboxes);

                textbox.markInvalid(error);

            }, R.keys(errors));
        };
        
        Ext.panel.AbstractPanel.prototype.validate = function (fields, obj) {
            var validationResults = R.map(function (key) {
                var value = eval('obj.' + key);
                var isValid = !(
                    R.propEqDeep(key, undefined, obj) ||
                    R.propEqDeep(key, null, obj) || 
                    R.propEqDeep(key, '', obj)
                );
                if (R.isArrayLike(value)) {
                    isValid = value.length > 0;
                }
                return isValid;
            }, fields);

            return !R.contains(false, validationResults);
        };

        Ext.panel.AbstractPanel.prototype.validateWrapper = function (func, fields, inputs, model) {
            var isValid = this.validate(
                        fields,
                        model
                    );
            if (isValid) {
                func();
            } else {
                var errors = this.getErrors(fields, model);
                this.markAsInvalid(errors, inputs);
            }
        };

        // fix this: http://www.sencha.com/forum/showthread.php?268135-Grid-error-on-delete-selected-row
        Ext.view.Table.prototype.doStripeRows = function(startRow, endRow) {
            var me = this,
                rows,
                rowsLn,
                i,
                row;
            if (me.rendered && me.stripeRows) {
                rows = me.getNodes(startRow, endRow);

                for (i = 0, rowsLn = rows.length; i < rowsLn; i++) {
                    row = rows[i];

                    if (row) { // self updating; check for row existence
                        row.className = row.className.replace(me.rowClsRe, ' ');
                        startRow++;

                        if (startRow % 2 === 0) {
                            row.className += (' ' + me.altRowCls);
                        }
                    }
                }
            }
        };

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

        var companyLogoMarkup = '<div style="position: absolute; bottom: 0px; right: 0;">' +
            '<img src="api/companies/{companyId}/logo" style="width: 150px;"></div>';
        

        Ilc.helpers.AppConfig.gridColumnStore = Ext.create('Ilc.store.GridConfig', { autoLoad: false });

        if (Ext.util.Cookies.get('LoggedIn') == 'True') {
            Ilc.Configuration.init({
                callback: function () {
                    window.document.body.innerHTML += companyLogoMarkup.replace('{companyId}', Ilc.Configuration.getValue('companyId'));

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


