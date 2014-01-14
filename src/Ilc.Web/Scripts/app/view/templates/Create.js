Ext.define('Ilc.view.templates.Create', {
    extend: 'Ext.window.Window',
    xtype: 'createtemplatewindow',

    requires: [
        'Ilc.utils.Forms',
        'Ilc.slider.TimeSlider'
    ],

    layout: 'anchor',
    width: 500,

    buttons: [
       {
           text: Ilc.resources.Manager.getResourceString('common.add'),
           handler: function (btn) {
               var me = btn.up('window');

               var model = {};

               var inputs = me.query('templatedaycontainer').concat(me.query('textfield'));

               model = Ilc.utils.Forms.extractModel(inputs);

               me.fireEvent('addtemplate', me, model);
               console.log(model);
           }
       },
       {
           text: Ilc.resources.Manager.getResourceString('common.cancel'),
           handler: function (btn) {
               btn.up('window').close();
           }
       }
    ],

    templateAdded: function() {
        this.fireEvent('templateadded');
        this.close();
    },

    initComponent: function() {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                anchor: '100%',
                name: 'name'
            },
            {
                xtype: 'button',
                text: 'Add day',
                handler: function () {
                    var slider = Ext.create('Ilc.view.templates.components.TemplateDayForm', {
                        anchor: '100%'
                    });
                    me.add(slider);
                }
            }
        ];

        me.addEvents(
            'addtemplate',
            'templateadded'
        );

        me.callParent(arguments);
    }
});