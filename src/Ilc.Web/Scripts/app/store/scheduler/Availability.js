Ext.define('Ilc.store.scheduler.Availability', {
    extend: 'Sch.data.EventStore',
    model: 'Ilc.model.Availability',

    // data: [
    //     { id: 1, resourceId: 2, startDate: "2013-12-11T08:00:00", endDate: "2013-12-11T12:00:00" },
    //     { id: 2, resourceId: 3, startDate: "2013-12-11T08:00:00", endDate: "2013-12-11T12:00:00" }
    //     // { ResourceId: 2, StartDate: "2011-09-01T10:00", EndDate: "2011-09-01T16:00" }
    // ],

    proxy: {
        type: 'rest',
        url: 'api/availabilities',
        extraParams: {
            format: 'json'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        }
    },

    isResourceAvailable: function (resource, start, end) {
        var availability = this.getEventsForResource(resource);

        if (!availability || availability.length === 0) return true;

        for (var i = 0; i < availability.length; i++) {
            console.log(availability[i].getStartDate());
            console.log(availability[i].getEndDate());
            console.log(start);
            console.log(end);
            if (Sch.util.Date.timeSpanContains(availability[i].getStartDate(), availability[i].getEndDate(), start, end)) {
                return true;
            }
        }

        return false;
    }
});