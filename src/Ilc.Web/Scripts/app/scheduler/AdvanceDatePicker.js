Ext.define('Ilc.scheduler.AdvanceDatePicker', {

    alias: "advanceDatePicker",
    extend: 'Ext.picker.Date',
    selectedDates: {},
    savedDates: {},
    clsHigligthClass: 'x-datepicker-selected',
    clsCurrentHighlight: 'x-datepicker-currentselected',
    clsSavedHighlight: 'x-datepicker-savedselected',
    eventStore: null,

    initComponent: function () {

        var me = this;
        me.callParent(arguments);

        me.eventStore.on('load', function (records) {
            me.eventStore.each(function (record) {
                me.savedDates[record.data.StartDate.toDateString()] = record.data.StartDate;
            });
        });

        me.on('select', me.handleSelectionChanged, me);
        me.on('afterrender', me.higlightDates, me);
    },

    reload: function (eventStore) {

        var me = this;

        mr.clearSelection();

        eventStore.each(function (record) {
            me.savedDates[record.data.StartDate.toDateString()] = record.data.StartDate;
        });

        me.higlightDates();
    },

    clearSelection: function () {
        var me = this;

        if (!me.cells) {
            return;
        }

        me.selectedDates = {};
        me.savedDates = {};

        me.cells.each(function (item) {
            item.removeCls(me.clsHigligthClass);
            item.removeCls(me.clsSavedHighlight);
        })
    },

    higlightDates: function () {
        var me = this;

        if (!me.cells) {
            return;
        }

        me.cells.each(function (item) {

            var date = new Date(item.dom.firstChild.dateValue).toDateString();

            if (me.selectedDates[date]) {
                if (item.getAttribute('class').indexOf(me.clsHigligthClass) === -1) {
                    item.addCls(me.clsHigligthClass)
                }
            }
            else {
                item.removeCls(me.clsHigligthClass);
            }

            if (me.savedDates[date]) {
                item.addCls(me.clsSavedHighlight)
            }
        })
    },

    handleSelectionChanged: function (cmp, date) {
        var me = this;

        if (me.selectedDates[date.toDateString()]) {
            delete me.selectedDates[date.toDateString()]
        }
        else {
            me.selectedDates[date.toDateString()] = date;
        }

        me.higlightDates();
    },

    showPrevMonth: function (e) {
        var me = this;
        var c = this.update(Ext.Date.add(this.activeDate, Ext.Date.MONTH, -1));
        me.higlightDates();
        return c;
    },

    showNextMonth: function (e) {
        var me = this;
        var c = this.update(Ext.Date.add(this.activeDate, Ext.Date.MONTH, 1));
        me.higlightDates();
        return c;
    },

    update: function () {
        var me = this;
        me.callParent(arguments);
        return me.higlightDates();
    }
})