app.directive('rightAscensionCoord', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {

            function fromUser(text) {
                if (text.split(':').length === 1 && !isNaN(parseFloat(text))) {
                    return text;
                } else if (text.split(':').length === 3) {
                    var data = text.split(':');
                    return (parseInt(data[0]) + parseInt(data[1])/60 + parseFloat(data[2])/3600) * 15
                }
            }

            function toUser(text) {
                if (text === null) {
                    return null;
                } else {
                    var abs_input = Math.abs(text) / 15;
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
                }

            }

            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});


app.directive('declinationCoord', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {

            function fromUser(text) {
                if (text.split(':').length === 1 && !isNaN(parseFloat(text))) {
                    return text;
                } else if (text.split(':').length === 3) {
                    var data = text.split(':');
                    return parseInt(data[0])/Math.abs(parseInt(data[0])) * (Math.abs(parseInt(data[0]))  + parseInt(data[1])/60 + parseFloat(data[2])/3600 );
                }
            }

            function toUser(text) {
                if (text === null) {
                    return null;
                } else {
                    var abs_input = Math.abs(text);
                    var sign = null;
                    if ((text / abs_input) >= 0){
                        sign = '+'
                    } else if ((text / abs_input) < 0) {
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
            }

            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});
