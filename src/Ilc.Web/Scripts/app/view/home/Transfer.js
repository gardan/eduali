Ext.define('Ilc.view.home.Transfer', {
    extend: 'Ext.container.Container',

    requires: [
        'Ilc.form.TransferBlockForm',
        'Ext.window.Window',
        'Ilc.grid.Transfers'
    ],

    layout: 'form',
    frame: 'true',

    constructor: function () {
        this.callParent(arguments);
    },

    items: [
        {
            xtype: 'button',
            itemId: 'toggleTransferForm',
            text: 'New transfer',
            listeners: {
                click: function (button, e) {
                    var view = button.up('container');

                    var window = view.getComponent('newTransferWindow');
                    
                    window.isVisible() ? window.hide() : window.show();
                }
            }
        },
        {
            xtype: 'transfergrid'
        },
        {
            xtype: 'window',
            itemId: 'newTransferWindow',
            closeAction: 'hide',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Student name',
                    name: 'studentName'
                },
                {
                    xtype: 'transferblockform'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Lesson transffered from',
                    name: 'transferredFrom'
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Lesson transffered in the following',
                    labelAlign: 'top',
                    items: [
                        { boxLabel: 'Telephone/Email', name: 'transferTypes', inputValue: 1 },
                        { boxLabel: 'Personal/Verbal', name: 'transferTypes', inputValue: 2 },
                        { boxLabel: 'File', name: 'transferTypes', inputValue: 3 }
                    ]
                },
                {
                    xtype: 'textareafield',
                    grow: true,
                    name: 'progressAndComments',
                    fieldLabel: 'Progress / Comments',
                    anchor: '100%',
                    labelAlign: 'top',
                    labelSeparator: ''
                },
                {
                    xtype: 'textareafield',
                    grow: true,
                    name: 'homework',
                    fieldLabel: 'Homework',
                    anchor: '100%',
                    labelAlign: 'top',
                    labelSeparator: ''
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Lesson transffered to',
                    name: 'transfferedTo'
                },
                {
                    xtype: 'button',
                    itemId: 'transferSave',
                    text: 'Save',
                    scale: 'large',
                    witdh: 500
                }
            ]
        }

    ]
});