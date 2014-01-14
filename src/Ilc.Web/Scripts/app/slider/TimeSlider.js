Ext.define('Ilc.slider.TimeSlider', {
    extend: 'Ext.slider.Multi',
    alias: 'widget.timeslider',

    startDate: null,
    endDate: null,

    constrainThumbs: false,
    values: [36000, 57600],
    increment: 60 * 5,
    minValue: 000000,
    maxValue: 86400 - (60 * 5), // we actually need the maximum time to be 23:55
    tipText: function (thumb) {
        var value = thumb.value;
        var totalMinutes = value / 60;
        var hour = Math.floor((totalMinutes / 60));
        var remainderMinutes = totalMinutes % 60;

        if (hour < 10) hour = 0 + hour.toString();
        if (remainderMinutes < 10) remainderMinutes = 0 + remainderMinutes.toString();

        var ret = hour + ':' + remainderMinutes;
        return ret;
    },
    
    getDateTimes: function () {
        var value = this.thumbs[0].value;
        var totalMinutes = value / 60;
        var hour = Math.floor((totalMinutes / 60));
        var remainderMinutes = totalMinutes % 60;
        var startDate = new Date(1, 1, 1, hour, remainderMinutes, 0, 0);

        value = this.thumbs[1].value;
        totalMinutes = value / 60;
        hour = Math.floor((totalMinutes / 60));
        remainderMinutes = totalMinutes % 60;
        var endDate = new Date(1, 1, 1, hour, remainderMinutes, 0, 0);

        return [
            startDate,
            endDate
        ];
    },

    initComponent: function() {
        var me = this;

        if (me.getRawValue() == false) {
            if (typeof (me.startDate) == 'string') {
                me.startDate = moment(me.startDate).toDate();
            }
            if (typeof (me.endDate) == 'string') {
                me.endDate = moment(me.endDate).toDate();
            }

            if (me.startDate != null && me.endDate != null) {
                me.values = [];
                var hour1 = me.startDate.getHours();
                var minute1 = me.startDate.getMinutes();

                var startTime1 = ((hour1 * 60) + minute1) * 60;

                var hour2 = me.endDate.getHours();
                var minute2 = me.endDate.getMinutes();

                var startTime2 = ((hour2 * 60) + minute2) * 60;

                me.values = [startTime1, startTime2];

            }
        }

        me.callParent(arguments);
    }
});