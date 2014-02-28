Ext.define('Ilc.tasks.training.PendingValidation', {
    extend: 'Ilc.tasks.training.Base',
    xtype: 'pendingvalidationwindow',

    buttons: [
        {
            text: Ilc.resources.Manager.getResourceString('common.validate'),
            handler: function () {
                var me = this.up('window');

                var model = {
                    validate: true,
                    taskEntityId: me.entity.get('taskObject').id
                };

                me.fireEvent('execute', me, model);
            }
        },
        {
            text: Ilc.resources.Manager.getResourceString('common.cancel'),
            handler: function () {
                var me = this.up('window');

                var model = {
                    validate: false,
                    taskEntityId: me.entity.get('taskObject').id
                };

                me.fireEvent('execute', me, model);
            }
        },
        '->',
        {
            text: Ilc.resources.Manager.getResourceString('common.close'),
            handler: function () {
                this.up('window').close();
            }
        }
    ],

    executed: function () {
        this.fireEvent('afterexecute');
        this.close();
    },

    initComponent: function() {
        var me = this;

        var training = me.entity.get('taskObject');

        var store = Ext.create('Ext.data.Store', {
            fields: ['key', 'val'],
            data: [
                { key: 'Total students', val: training.students.length },
                { key: 'Required students', val: training.requiredStudents },
                { key: 'Due at', val: Ext.util.Format.date(training.dateOfValidation, Ilc.resources.Manager.getResourceString('formats.extjsdateonly')) },
                { key: 'Price', val: training.price },
                { key: 'Location', val: training.location }
            ]
        });

        me.items = [
            {
                xtype: 'grid',
                hideHeaders: true,
                columns: [
                    { dataIndex: 'key', flex: 0.5 },
                    { dataIndex: 'val', flex: 1 }
                ],
                store: store
            }
        ];

        me.callParent(arguments);
    }
});