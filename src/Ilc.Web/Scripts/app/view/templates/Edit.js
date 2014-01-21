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
    editable: true,
    _availabilityDaysIndex: 0,
    
    templateUpdated: function() {
        this.fireEvent('templatededited');
        this.close();
    },

    onTemplateRemove: function (templateForm) {
        var me = this.up();
        me.remove(templateForm);
        me._availabilityDaysIndex -= 1;
        
        // reset the indexes
        var templateForms = me.query('templatedaycontainer');
        Ext.Array.forEach(templateForms, function (form, index) {
            form.setIndex(index);
            me._availabilityDaysIndex = index + 1;
        });
        
    },

    initComponent: function () {
        var me = this;

        me._availabilityDaysIndex = me.template.get('templateDays').length;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                anchor: '100%',
                name: 'name',
                value: me.template.get('name'),
                disabled: !me.editable
            },
            {
                xtype: 'button',
                text: 'Add day',
                disabled: !me.editable,
                handler: function () {
                    var slider = Ext.create('Ilc.view.templates.components.TemplateDayForm', {
                        anchor: '100%',
                        index: me._availabilityDaysIndex,
                        listeners: {
                            removeclicked: me.onTemplateRemove
                        }
                    });
                    me._availabilityDaysIndex += 1;
                    me.add(slider);
                }
            }
        ];

        Ext.Array.forEach(me.template.get('templateDays'), function (value, index) {
            var slider = Ext.create('Ilc.view.templates.components.TemplateDayForm', {
                anchor: '100%',
                templateDay: value,
                index: index,
                editable: me.editable,
                listeners: {
                    removeclicked: me.onTemplateRemove
                }
            });
            me.items.push(slider);
        });

        me.buttons = [
            {
                text: Ilc.resources.Manager.getResourceString('common.save'),
                disabled: !me.editable,
                handler: function(btn) {
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
                handler: function(btn) {
                    btn.up('window').close();
                }
            }
        ];

        me.addEvents(
            'edittemplate',
            'templatededited'
        );

        me.callParent(arguments);
    }
});