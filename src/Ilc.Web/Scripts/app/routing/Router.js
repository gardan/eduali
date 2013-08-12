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

                // adjust the controller and action names
                action = Ext.String.capitalize(match.action);
                controller = match.controller.charAt(0).toLowerCase() + match.controller.substr(1);

                // try to get the view by controller + action names
                viewClass = Ext.ClassManager.get('Ilc.view.' + controller + '.' + action);

                if (viewClass) {
                    // create view
                    view = Ext.create(viewClass, {
                        border: false
                    });

                    // clear target and add new view
                    target.removeAll();
                    target.add(view);

                    // adjust top toolbar
                    if (navToolbar.child('#' + controller)) {
                        navToolbar.child('#' + controller).toggle(true);
                    }
                }
            }
        });
    }
})