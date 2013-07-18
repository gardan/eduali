﻿Ext.define('Ilc.tasks.training.Rfi', {
    extend: 'Ext.window.Window',
    xtype: 'rfiwindow',

    constructor: function () {
        var me = this;

        me.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Possible costs',
                name: 'possibleCost'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'No. of lessons',
                name: 'lessonsNo'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Lesson duration',
                name: 'lessonDuration'
            },
            {
                xtype: 'button',
                text: 'Execute and download offer',
                handler: function (btn, event) {
                    console.log('Firing addrfi');
                    var model = {};

                    var textboxes = me.query('textfield');
                    for (var i = 0; i < textboxes.length; i++) {
                        var textbox = textboxes[i];
                        var name = textbox.name;
                        var value = textbox.getRawValue();
                        model[name] = value;
                    }

                    me.fireEvent('addrfi', me, model);
                }
            }
        ];

        me.addEvents('addrfi');
        
        this.callParent(arguments);
    }
});