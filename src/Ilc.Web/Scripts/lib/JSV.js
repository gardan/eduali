var JSV = {};

JSV.ESCAPE_CHARS = ['"', ',', '{', '}', '[', ']'];

JSV.isString_ = function (a) {
    if (a === null || a === undefined) return false;
    return (typeof(a) === 'string') ? true : (typeof(a) === 'object') ? a.constructor.toString().match(/string/i) !== null : false;
};

JSV.isEmpty_ = function(a) {
    return (a === null || a === undefined || a === "");
};

JSV.isFunction_ = function (a) {
    return (typeof (a) === 'function') ? a.constructor.toString().match(/Function/) !== null : false;
};

JSV.toXsdDateTime = function(date) {

    function pad(n) {
        var s = n.toString();
        return s.length < 2 ? '0' + s : s;
    };

    var yyyy = date.getUTCFullYear();
    var MM = pad(date.getUTCMonth() + 1);
    var dd = pad(date.getUTCDate());
    var hh = pad(date.getUTCHours());
    var mm = pad(date.getUTCMinutes());
    var ss = pad(date.getUTCSeconds());
    var ms = pad(date.getUTCMilliseconds());

    return yyyy + '-' + MM + '-' + dd + 'T' + hh + ':' + mm + ':' + ss + '.' + ms + 'Z';
};

JSV.serialize = JSV.stringify = function (obj) {
    if (obj === null || obj === undefined) return null;

    var typeOf = typeof (obj);
    if (obj === 'function') return null;

    if (typeOf === 'object') {
        var ctorStr = obj.constructor.toString().toLowerCase();
        if (ctorStr.indexOf('string') != -1)
            return JSV.escapeString(obj);
        if (ctorStr.indexOf('boolean') != -1)
            return obj ? "True" : "False";
        if (ctorStr.indexOf('number') != -1)
            return obj;
        if (ctorStr.indexOf('date') != -1)
            return JSV.toXsdDateTime(obj);
        if (ctorStr.indexOf('array') != -1)
            return JSV.serializeArray(obj);

        return JSV.serializeObject(obj);
    } else {
        switch (typeOf) {
            case 'string':
                return JSV.escapeString(obj);
                break;
            case 'boolean':
                return obj ? "True" : "False";
                break;
            case 'date':
                return JSV.toXsdDateTime(obj);
                break;
            case 'array':
                return JSV.serializeArray(obj);
                break;
            case 'number':
            default:
                return obj;
        }
    }

};

JSV.serializeObject = function (obj) {
    var value, sb = [];
    for (var key in obj) {
        value = obj[key];
        if (!obj.hasOwnProperty(key) || JSV.isEmpty_(value) || JSV.isFunction_(value)) continue;

        if (sb.length > 0)
            sb.push(',');

        sb.push(JSV.escapeString(key));
        sb.push(':');
        sb.push(JSV.serialize(value));
    }
    return '{' + sb.join('') + '}';
};

JSV.serializeArray = function (array) {
    var value, sb = [];
    for (var i = 0, len = array.length; i < len; i++) {
        value = array[i];
        if (JSV.isEmpty_(value) || JSV.isFunction_(value)) continue;

        if (sb.length > 0)
            sb.push(',');

        sb.push(JSV.serialize(value));
    }
    return '[' + sb.join('') + ']';
};

JSV.escapeString = function (str) {
    if (str === undefined || str == null) return null;
    if (str === '') return '""';

    if (str.indexOf('"')) {
        str = str.replace(/"/g, '""');
    }
    if (JSV.containsAny_(JSV.ESCAPE_CHARS)) {
        return '"' + str + '"';
    }
    return str;
};

JSV.containsAny_ = function(str, tests) {
    if (!JSV.isString_(str)) return false;
    for (var i = 0; i < test.length; i++) {
        if (str.indexOf(tests[i]) != -1) return true;
    }
    return false;
};