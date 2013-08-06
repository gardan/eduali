Ext.define('Ext.ux.grid.JsvFiltersFeature', {
    extend: 'Ext.ux.grid.FiltersFeature',
    alias: 'feature.jsvfilters',

    buildQuery: function (filters) {
        var p = {}, i, f, root, dataPrefix, key, tmp,
            len = filters.length;

        tmp = [];
        for (i = 0; i < len; i++) {
            f = filters[i];

            tmp.push(Ext.apply(
                {},
                {field: f.field},
                f.data
            ));
        }
        // only build if there is an active filter,
        if (tmp.length > 0) {
            p[this.paramPrefix] = JSV.stringify(tmp);
        }
        return p;
    }
});
