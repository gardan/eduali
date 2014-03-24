Ext.define('Ilc.view.companies.Default', {
    extend: 'Ext.container.Container',
    xtype: 'companycontainer',

    defaults: {
        
    },

    avatarUploader: null,
    company: null,

    onUploadComplete: function () {
        
    },

    onCompanyLoad: function (store, records) {
        var company = records[0];
        this.company = company;
        var companyId = records[0].get('id');
        var avatarUrl = 'api/companies/' + companyId + '/logo';
        this.avatarUploader.setUploadUrl(avatarUrl);

        var txt = this.query('textfield[name="name"]')[0];
        txt.setRawValue(company.get('name'));
    },

    companyUpdated: function() {
        this.avatarUploader.initUpload();
    },

    initComponent: function () {
        this.addEvents(
            'updatecompany'
        );

        var companiesStore = Ext.create('Ilc.store.Companies', {
            listeners: {
                load: {
                    scope: this,
                    single: true,
                    fn: this.onCompanyLoad
                }
            }
        });
        companiesStore.load();
        
        this.avatarUploader = Ext.create('Ilc.uploader.Avatar', {
            avatarUrl: '',
            uploadUrl: '', // Method: PUT
            fieldLabel: 'Avatar',
            listeners: {
                'uploadcomplete': this.onUploadComplete,

                scope: this
            }
        });

        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: Ilc.resources.Manager.getResourceString('common.name'),
                name: 'name'
            },
            this.avatarUploader,
            {
                xtype: 'button',
                text: 'Save',
                listeners: {
                    click: function () {
                        var inputs = this.query('textfield');
                        var model = Ilc.utils.Forms.extractModel(inputs);
                        model.id = this.company.get('id');

                        this.fireEvent('updatecompany', this, model);
                    },
                    scope: this
                }
            }
        ];

        this.callParent(arguments);
    }
});