Ext.define('Ilc.view.templates.components.TemplateDayForm', {
    extend: 'Ext.container.Container',
    xtype: 'templatedaycontainer',

    requires: [
        'Ilc.slider.TimeSlider',
        'Ilc.plugins.slider.Highlight'
    ],

    layout: 'column',
    // myDays : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    myDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],

    templateDay: null,
    editable: true,
    index: 0,

    // Doru
    _setSliderLabel: function () {
        var slider = this.query('multislider')[0];
        slider.setFieldLabel(myDays[this.index]);
    },

    setIndex: function(index) {
        this.index = index;
        this._setSliderLabel();
    },

    getDateTimes: function () {
        return this.items.items[0].getDateTimes();
    },
    
    getOffDay: function() {
        return this.items.items[1].getRawValue();
    },

    initComponent: function() {
        var me = this;

        var offDay = me.templateDay != null ? me.templateDay.offDay : false;
        var startDate = me.templateDay != null ? me.templateDay.startDate : null;
        var endDate = me.templateDay != null ? me.templateDay.endDate : null;
        me.items = [
            {
                xtype: 'timeslider',
                columnWidth: 1,
                labelWidth: 40,
                fieldLabel: (me.myDays[me.index + 1]),
                margin: '2 10 0 0',
                disabled: offDay,
                readOnly: !me.editable,
                startDate: startDate,
                endDate: endDate,
                plugins: [
                    Ext.create('Ilc.plugins.slider.Highlight')
                ]
            },
            {
                xtype: 'checkboxfield',
                checked: offDay,
                disabled: !me.editable,
                width: 14,
                listeners: {
                    change: function (checkbox, newValue) {
                        var me = checkbox.up();

                        var slider = me.items.items[0];
                        slider.setDisabled(newValue);
                    },
                    afterrender: function(checkbox) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: checkbox.el,
                            html: 'Rest day'
                        });
                    }
                }
            },
        {
            xtype: 'button',
            disabled: !me.editable,
            cls: 'clean-button',
            iconCls: 'icon-delete',
            handler: function() {
                me.fireEvent('removeclicked', me);
            }
        }
        ];

        me.addEvents('removeclicked');

        me.callParent(arguments);
    }
});