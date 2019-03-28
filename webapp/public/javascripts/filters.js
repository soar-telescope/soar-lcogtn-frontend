// var app = angular.module('requestGroupsApp');

app.filter('rafmt', function () {
    return function (input) {
        var abs_input = Math.abs(input) / 15;
        var hh = Math.floor(abs_input).toString();
        var mm =  Math.floor((abs_input - hh) * 60).toString();
        var ss = Math.floor((((abs_input - hh) * 60 - mm) * 60).toPrecision(2)).toString();

        if (hh.length === 1) {
            hh = '0' + hh;
        }

        if (mm.length === 1) {
            mm = '0' + mm;
        }

        if (ss.length === 1) {
            ss = '0' + ss;
        }

        if (hh === 'NaN' && mm === 'NaN' && ss === 'NaN') {
            return null;
        } else {
            return [hh, mm, ss].join(':');
        }

    };
});


app.filter('decfmt', function () {
    return function (input) {
        var abs_input = Math.abs(input);
        var sign = null;
        if ((input / abs_input) >= 0){
            sign = '+'
        } else if ((input / abs_input) < 0) {
            sign = '-'
        } else {
            sign = '';
        }
        var dd = Math.floor(abs_input).toString();
        var mm = Math.floor((abs_input - dd) * 60).toString();
        var ss = Math.floor((((abs_input - dd) * 60 - mm) * 60).toPrecision(2)).toString();

        if (dd.length === 1) {
            dd = '0' + dd;
        }

        if (mm.length === 1) {
            mm = '0' + mm;
        }

        if (ss.length === 1) {
            ss = '0' + ss;
        }

        if (dd === 'NaN' && mm === 'NaN' && ss === 'NaN') {
            return null;
        } else {
            return sign + [dd, mm, ss].join(':');
        }


    }
});

