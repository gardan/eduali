Ext.define('Ilc.controller.Offers', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ilc.model.Offer'  
    ],

    init: function() {
    },
    
    list: function() {

    },
    create: function() {
    },
    edit: function(params) {
        var deferred = Q.defer(),
            offerId = parseInt(params.id);
        
        var model = Ilc.model.Offer.load(offerId, {
            success: function(offer) {
                var view = Ext.create('Ilc.view.offers.Edit', {
                    border: false,
                    params: params,
                    model: offer
                });

                deferred.resolve(view);
            }
        });

        

        return deferred.promise;
    }
});