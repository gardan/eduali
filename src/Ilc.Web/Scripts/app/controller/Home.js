Ext.define('Ilc.controller.Home', {
    extend: 'Ext.app.Controller',
    
    stores: [
        'Questions',
        'Transfers'
    ],

    init: function () {
        var self = this;

        this.control({
            '#main-nav-toolbar button': {
                click: this.onMainNavClick
            },
            'viewport': {
                menuclick: this.onMainNavClick
            }
        });
    },

    onMainNavClick: function (btn) {
        var routeId = '';
        if (btn.itemId == undefined) { // check if it is a menu button
            return;
        }
        routeId = btn.itemId.substring(5);
        Ext.Router.redirect(routeId === 'evaluation' ? '' : routeId);
    }
});