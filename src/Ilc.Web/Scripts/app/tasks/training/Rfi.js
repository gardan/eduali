Ext.define('Ilc.tasks.training.Rfi', {
    extend: 'Ext.window.Window',
    xtype: 'rfiwindow',

    layout: 'anchor',

    defaults: {
        width: 250,
        anchor: '100%'
    },

    constructor: function (args) {
        var me = this;
        debugger;
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
                xtype: 'button',
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
            },
            {
                xtype: 'button',
                text: Ilc.resources.Manager.getResourceString('common.execute'),
                handler: function (btn, event) {
                    console.log('Firing addrfi');
                    var model = {
                        complete: true,
                        trainingId: entity.get('id')
                    };
                    
                    me.fireEvent('addrfi', me, model);
                }
            }
        ];

        me.addEvents('addrfi');
        
        this.callParent(arguments);
    }
});