Ext.define('Ilc.tasks.training.window.CreateRfi', {
    extend: 'Ext.window.Window',
    
    constructor: function(args) {
        var me = this;
        var entity = args.entity;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.possibleCosts'),
                name: 'possibleCost'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lessonNo'),
                name: 'lessonsNo'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lessonDuration'),
                name: 'lessonDuration'
            },
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.details'),
                name: 'details'
            }
        ];

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.createOffer'),
                handler: function () {
                    console.log('Firing addrfi');
                    var model = {};

                    var textboxes = me.query('textfield');
                    for (var i = 0; i < textboxes.length; i++) {
                        var textbox = textboxes[i];
                        var name = textbox.name;
                        var value = textbox.getRawValue();
                        model[name] = value;
                    }
                    model.trainingId = entity.get('id');


                    me.fireEvent('addrfi', me, model);
                }
            }
        ];

        me.addEvents('addrfi');

        this.callParent(arguments);
    }
});