Ext.define('Ilc.routing.Router', {

    requires: [
        'Ext.ux.Router'
    ],

    init: function () {
        
        Ext.ux.Router.on({
            routemissed: function (token) {
                Ext.Msg.show({
                    title: 'Error 404',
                    msg: 'Route not found: ' + token,
                    button: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            },

            beforedispatch: function (token, match, params, prevMatch) {
                if (!prevMatch) {
                    return;
                }
                var controllerName = prevMatch.controller.charAt(0).toUpperCase() + prevMatch.controller.substr(1),
                    controller = window.Ilc.app.getController(controllerName);

                if (controller.beforedispatch) {
                    controller.beforedispatch();
                }
            },

            dispatch: function (token, match, params, controller) {
                var view, viewClass, action,
                    viewport = Ext.getCmp('viewport'),
                    target = viewport.down('#viewport-target'),
                    navToolbar = viewport.down('#main-nav-toolbar');

                // close all the windows
                var windows = Ext.ComponentQuery.query('window');
                Ext.Array.forEach(windows, function (window) {
                    if (window.xtype == 'messagebox') return;
                    window.close();
                });

                // adjust the controller and action names
                action = Ext.String.capitalize(match.action);
                var controllerName = match.controller.charAt(0).toLowerCase() + match.controller.substr(1),
                    promise = controller[action.toLowerCase()](params);

                if (!promise) {
                    promise = Q.fcall(function() {
                        return false;
                    });
                }
                promise
                    .then(function(result) {
                        view = result;
                                
                        // try to get the view by controller + action names
                        viewClass = Ext.ClassManager.get('Ilc.view.' + controllerName + '.' + action);


                        if (viewClass) {
                            // create view
                            if (!view) {
                                view = Ext.create(viewClass, {
                                    params: params,
                                    border: false
                                });
                            }
                            // clear target and add new view
                            target.removeAll();
                            target.add(view);

                            // adjust top toolbar
                            if (navToolbar.child('#' + controllerName)) {
                                navToolbar.child('#' + controllerName).toggle(true);
                            }
                            ;

                        } else {
                            console.log('Ilc.view.' + controller + '.' + action, ' not found');
                        }
                    });
            }
        });
    }
})