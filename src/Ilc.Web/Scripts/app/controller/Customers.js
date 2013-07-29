Ext.define('Ilc.controller.Customers', {
    extend: 'Ext.app.Controller',
    
    init: function () {
        this.control({
            'listcustomers': {
                'addCustomer': this.addCustomer
            }
        });
    },

    addCustomer: function (sender, model) {
        console.log(model);
    },
    
    list: function () {
        
    }
});