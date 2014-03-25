Ext.define('Ilc.form.InterviewFieldset', {
    extend: 'Ext.form.FieldSet',
    xtype: 'interviewfieldset',

    config: {
        // required
        gradesStore: null,

        attribute: null,
        
        name: null,
    },

    _getGradeId: function(type) {
        var name = type + this.getAttribute().name;
        var combo = this.query('combobox[name="' + name + '"]')[0];

        var model = Ilc.utils.Forms.extractModel([combo]);
        return model[name];
    },

    getCurrentGradeId: function () {
        return this._getGradeId('current_');
    },

    getTargetGradeId: function () {
        return this._getGradeId('target_');
    },

    initComponent: function () {

        var attr = this.attribute;
        this.title = attr.name;
        
        this.items = [
            {
                xtype: 'combobox',
                store: this.gradesStore,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.level'),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'current_' + attr.name,
                anchor: '100%'
            },
            {
                xtype: 'combobox',
                store: this.gradesStore,
                fieldLabel: Ilc.resources.Manager.getResourceString('common.targetLevel'),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'target_' + attr.name,
                anchor: '100%'
            }
        ];

        this.callParent();
    }
});