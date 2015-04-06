Ext.define('Ilc.view.stakeholders.Add', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Ext.ux.form.field.BoxSelect',
        'Ilc.utils.Forms'
    ],

    layout: 'anchor',
    width: '600px',

    getButtons: function () {
        return [
            {
                xtype: 'button',
                text: 'Cancel',
                listeners: {
                    scope: this,
                    click: function() {
                        this.close();
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Add',
                listeners: {
                    scope: this,
                    click: this.onAddClick
                }
            }
        ];
    },

    getItems: function() {
        var items = [];

        var usersStore = Ext.create('Ilc.store.Users');
        
        usersStore.load = R.wrap(usersStore.load, function (wrapped, options) {
                options = options || {};
                options.params = options.params || {};
                
                options.params.claims = 'tasks-trainer';
                wrapped.call(usersStore, options);
            });

        this.stakeholdersBoxSelect = Ext.create('Ext.ux.form.field.BoxSelect', {
            store: usersStore,
            displayField: 'fullName',
            valueField: 'id',
            fieldLabel: Ilc.resources.Manager.getResourceString('common.stakeholders'),
            anchor: '100%',
            name: 'stakeholders'
        });

        items.push(this.stakeholdersBoxSelect);

        return items;
    },

    onAddClick: function () {
        var me = this;
        var model = Ilc.utils.Forms.extractModel(this.query('textfield'));

        var addStakeholderModel = Ext.create('Ilc.model.stakeholders.Add', {
            stakeholders: R.map(R.get('id'), model.stakeholders),
            trainingId: me.training.get('id')
        });
        addStakeholderModel.save({
            success: function() {
                me.fireEvent('added-stakeholders');
                me.close();
            },
            error: function() {

            }
        });

    },

    initComponent: function() {

        this.items = this.getItems();

        this.buttons = this.getButtons();

        this.addEvents('added-stakeholders');

        this.callParent(arguments);
    }
});