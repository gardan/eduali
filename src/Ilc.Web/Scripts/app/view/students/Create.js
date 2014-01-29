Ext.define('Ilc.view.students.Create', {
    extend: 'Ext.window.Window',

    title: Ilc.resources.Manager.getResourceString('common.newStudent'),

    requires: [
        'Ilc.utils.Forms'
    ],
    
    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },

    layout: 'anchor',
    bodyPadding: 10,
    
    avatarUploader: null,

    studentAdded: function () {
        this.fireEvent('studentadded');
        this.close();
        // this.avatarUploader.initUpload();
    },

    onUploadComplete: function () {
        this.fireEvent('studentadded');
        this.close();
    },

    constructor: function () {
        var me = this;

        var customersStore = Ext.create('Ilc.store.Customers');

        var customerComboBox = Ext.create('Ext.form.ComboBox', {
            store: customersStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'customerId',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.customer'),
            anchor: '100%'
        });

        me.avatarUploader = Ext.create('Ilc.uploader.Avatar', {
            avatarUrl: 'api/users/0/avatar',
            // uploadUrl: 'api/users/' + userId + '/avatar', // Method: PUT
            fieldLabel: 'Avatar',
            listeners: {
                'uploadcomplete': me.onUploadComplete,

                scope: me
            }
        });

        me.items = [
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.firstName'),
                name: 'userInfo.firstName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.lastName'),
                name: 'userInfo.lastName',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.email'),
                name: 'userInfo.email',
            },
            {
                fieldLabel: Ilc.resources.Manager.getResourceString('common.phone'),
                name: 'userInfo.phone',
            },
            customerComboBox,
            me.avatarUploader
        ];

        me.buttons = [
             {
                 text: Ilc.resources.Manager.getResourceString('common.add'),
                 handler: function () {
                     var model = {};
                     var inputs = me.query('textfield');

                     model = Ilc.utils.Forms.extractModel(inputs);

                     console.log(model);
                     me.fireEvent('addStudent', me, model);
                 }
             },
            {
                text: Ilc.resources.Manager.getResourceString('common.cancel'),
                handler: function () {
                    me.close();
                }
            }
        ];

        me.addEvents(
            'addStudent',
            'studentadded'
        );

        me.callParent(arguments);
    }
});
