Ext.define('Ilc.view.students.View', {
    extend: 'Ext.panel.Panel',
    
    layout: 'anchor',

    initComponent: function () {
        var me = this;
        var map = {
            'general': 'Ilc.view.students.Edit',
            'trainings': 'Ilc.view.students.component.Trainings'
        };

        var tabParam = this.params.tab || 'general';

        this.items = [
            {
                xtype: 'toolbar',
                region: 'north',
                items: [
                    {
                        text: Ilc.resources.Manager.getResourceString('common.back'),
                        listeners: {
                            click: function() {
                                window.history.back();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'toolbar',
                region: 'north',
//                 defaults: {
//                     iconAlign: 'right',
//                     scale: 'normal',
//                     margin: 0,
//                     overCls: 'eduali-menu-hover',
//                     pressedCls: 'eduali-menu-pressed',
//                     cls: 'eduali-menu',
//                     toggleGroup: 'main-nav',
//                     border: '0 2 0 0',
//                     allowDepress: false
//                 },
                items: [{
                    xtype: 'button',
                    text: 'General',
                    pressed: tabParam === 'general',
                    listeners: {
                        click: function() {
                            Ext.ux.Router.redirect('students/' + me.params.id + '?tab=general');
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Trainings',
                    pressed: tabParam === 'trainings',
                    listeners: {
                        click: function() {
                            Ext.ux.Router.redirect('students/' + me.params.id + '?tab=trainings');
                        }
                    }
                }]
            },
            Ext.create(map[tabParam], {
                params: this.params,
                anchor: '100%'
            })
        ];
        

        this.callParent();
    }
});