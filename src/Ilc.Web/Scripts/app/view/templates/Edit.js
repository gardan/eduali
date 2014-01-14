Ext.define('Ilc.view.templates.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'edittemplatewindow',

    requires: [
        'Ilc.utils.Forms',
        'Ilc.slider.TimeSlider'
    ],

    layout: 'anchor',
    width: 500,

    template: null,
    
    buttons: [
        {
            text: Ilc.resources.Manager.getResourceString('common.save'),
            handler: function (btn) {
                var me = btn.up('window');

                var model = {};

                var inputs = me.query('templatedaycontainer').concat(me.query('textfield'));

                model = Ilc.utils.Forms.extractModel(inputs);
                model.id = me.template.get('id');
                
                me.fireEvent('edittemplate', me, model);
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.cancel'),
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ],

    templateUpdated: function() {
        this.fireEvent('templatededited');
        this.close();
    },

    initComponent: function () {
        var me = this;
        
        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                anchor: '100%',
                name: 'name',
                value: me.template.get('name')
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

        Ext.Array.forEach(me.template.get('templateDays'), function (value) {
            var slider = Ext.create('Ilc.view.templates.components.TemplateDayForm', {
                anchor: '100%',
                templateDay: value
            });
            me.items.push(slider);
        });

        me.addEvents(
            'edittemplate',
            'templatededited'
        );

        me.callParent(arguments);
    }
});