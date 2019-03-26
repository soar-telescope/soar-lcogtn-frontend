var app = angular.module('requestGroupsApp');

app.controller('mainController', function ($scope, $location) {
    $scope.page_title = 'SOAR-LCO Interface';
    console.log('Loading main controller');
    $scope.settings = function () {
        $location.path('/settings');
    }
});

app.controller('settingsController', function($scope, $window) {
   $scope.new_token = '';
   $scope.add_token = function() {
       // c377c2bfbaafd9089b12a1b3590fc8b0d39c5686
       $window.localStorage.setItem('lcoToken', 'Token ' + $scope.new_token);
       // console.log($scope.new_token);
   };

   $scope.token_exist = function () {

       if ($window.localStorage.getItem('lcoToken')) {
           var token = $window.localStorage.getItem('lcoToken').split(' ');
           if (token.length === 2 && token[0] === 'Token') {
               return true
           } else {
               return false
           }
       } else {
           return false
       }


   };

   $scope.delete_token = function () {
       $window.localStorage.removeItem('lcoToken');
   }
});

app.controller('indexController', function($scope, $http, $window) {
    $scope.current_active = null;
    $scope.message = '';
    $scope.is_active = function(id) {
        return $scope.current_active === id;
    };

    $scope.change_active = function(id) {
        if ($scope.current_active == id) {
            $scope.current_active = null;
        } else {
            $scope.current_active = id;
        }

    };
    $scope.pagination = {
        total_items: 0,
        current_page: 1,
        items_per_page: 10,
        prev_page: 1
    };

    $scope.reqGroups = null;

    // code is too ugly here
    $scope.page_changed = function() {
        // console.log($scope.pagination.current_page);
        // console.log($scope.pagination.prev_page);
        var params = null;
        var new_offset = null;
        var new_url = null;
        if ($scope.pagination.current_page - $scope.pagination.prev_page === 1) {
            console.log($scope.pagination.current_page);
            $scope.get_data($scope.reqGroups.next);
        } else if ($scope.pagination.current_page - $scope.pagination.prev_page === -1) {
            $scope.get_data($scope.reqGroups.previous);
        } else if ($scope.pagination.current_page - $scope.pagination.prev_page > 1) {
            params = $scope.get_query_string_params($scope.reqGroups.next);
            new_offset = ($scope.pagination.current_page - $scope.pagination.prev_page) * $scope.pagination.items_per_page;
            new_url = $scope.reqGroups.next.replace('offset='+ params.offset, 'offset=' + new_offset);
            $scope.get_data(new_url);

        } else if ($scope.pagination.current_page - $scope.pagination.prev_page < -1) {
            params = $scope.get_query_string_params($scope.reqGroups.previous);
            new_offset =  parseInt(params.offset) + (($scope.pagination.current_page - $scope.pagination.prev_page) + 1)* $scope.pagination.items_per_page;
            new_url = $scope.reqGroups.previous.replace('offset='+ params.offset, 'offset=' + new_offset);
            $scope.get_data(new_url);
        }
        $scope.pagination.prev_page = $scope.pagination.current_page;
    };

    $scope.get_query_string_params = function(full_url) {
        var params = {};
        if (full_url) {

            var options = full_url.split('?')[1].split('&');
            options.forEach(function (pair) {
                pair = pair.split('=');
                params[pair[0]] = decodeURIComponent(pair[1] || '');
            });
        }
        return params;
    };


    $scope.get_data = function (next) {
        var params = $scope.get_query_string_params(next);
        $http({
            method: 'GET',
            url: '/api/requestgroups/',
            headers: {
                'Authorization':  $window.localStorage.getItem('lcoToken')
            },
            params: JSON.parse(JSON.stringify(params))
        }).then(function (res) {
            if (res.data.success) {
                $scope.reqGroups = res.data.data;
                $scope.pagination.total_items = $scope.reqGroups.count;
                if ($scope.current_active === null) {
                    $scope.current_active = $scope.reqGroups.count;
                }
            } else {
                $scope.message = res.data.msg;
            }

        }, function(err) {
            console.log(err);
        });
    };



    $scope.delete = function(group) {
        $http({
            method: 'DELETE',
            url: '/api/requestgroups/' + group.id,
            headers: {
                'Authorization': $window.localStorage.getItem('lcoToken')
            },
        }).then(function (res) {
            if (res.data.success) {
                $scope.get_data();
                console.log(res.data.data);
            } else {
                console.log("error");
                console.log(res);
            }

        }, function(err) {
            console.log(err);
        });
    };

    $scope.get_data();

});


app.controller('addOneController', function($scope, $http, $location, $window) {
    $scope.observation_types = ['NORMAL'];
    $scope.operator_options = ['SINGLE'];
    $scope.gratings = ['SYZY_400'];
    $scope.slits = ['slit_1.0as'];
    $scope.rot_modes = ['SKY'];
    $scope.instrument_type = ['SOAR_GHTS_REDCAM'];
    $scope.guiding_configs = ['OPTIONAL'];
    $scope.acquisition_config_modes = ['MANUAL'];
    $scope.configuration_types = ['SPECTRUM', 'ARC', 'LAMP_FLAT'];
    $scope.target_types = ['SIDEREAL', 'NON-SIDEREAL'];
    $scope.rot_modes = ['SKY', 'FLOAT', 'VERTICAL', 'VFLOAT'];
    $scope.target = {
        'dec': null,
        'epoch': null,
        'name': null,
        'proper_motion_dec': null,
        'proper_motion_ra': null,
        'ra': null,
        'type': 'SIDEREAL'};

    $scope.instrument_configs = [{
        'bin_x': 2,
        'bin_y': 2,
        'exposure_count': 1,
        'exposure_time': null,
        'rot_mode' : 'SKY',
        'optical_elements': {
            'grating': 'SYZY_400',
            'slit': 'slit_1.0as'
            },
        'extra_params': {
            'rot_angle': 0}
        }];

    $scope.configurations = [{
        'acquisition_config': {
            'mode': 'MANUAL'
        },
        'constraints': {
            'max_airmass': 1.6,
            'min_lunar_distance': 30
        },
        'guiding_config': {
            'state': 'OPTIONAL'
        },
        'instrument_configs': $scope.instrument_configs,
        'instrument_type': 'SOAR_GHTS_REDCAM',
        'target': $scope.target,
        'type': 'SPECTRUM'}];

    $scope.windows = [{
        'start': moment.utc(), //.format('YYYY-MM-DD HH:mm:ss'),
        'end': moment.utc().add(1, 'days')}]; // .format('YYYY-MM-DD HH:mm:ss')

    $scope.requests = [{
        'acceptability_threshold': 90,
        'configurations': $scope.configurations,
        'location': {'telescope_class': '4m0'},
        'windows': $scope.windows}];

    $scope.request_group_general = {
        'ipp_value': 1.05,
        'name': 'test',
        'observation_type': 'NORMAL',
        'operator': 'SINGLE',
        'proposal': null};

    create_request_group = function() {
        $scope.request_group = Object.assign(
            $scope.request_group_general,
            {'requests': $scope.requests})};

    $scope.post_data = function () {
        create_request_group();
        // console.log($scope.request_group);
        // return 0;
        $http({
            method: 'POST',
            url: '/api/requestgroups',
            headers: {
                'Authorization': $window.localStorage.getItem('lcoToken')
            },
            data: $scope.request_group
        }).then(function (res) {
            if (res.data.success) {
                // console.log(res.data.data);
                $location.path('/');
            } else {
                console.log("error");
                console.log(res);
            }

        }, function(err) {
            console.log(err);
        });
    };

    $scope.add_one_configuration = function() {
        var new_conf = angular.copy($scope.configurations.slice().reverse()[0]);
        $scope.configurations.push(new_conf);
    };

    $scope.remove_configuration = function(index) {
        $scope.configurations.splice(index, 1);
    };

    $scope.add_one_window = function() {
        console.log('Calling add one window');
        var new_window = angular.copy($scope.windows.slice().reverse()[0]);
        $scope.windows.push(new_window);

        var new_popup = angular.copy($scope.popups.slice().reverse()[0]);
        $scope.popups.push(new_popup);
    };

    $scope.remove_window = function(index) {
        $scope.windows.splice(index, 1);
        $scope.popups.splice(index, 1);
    };

    $scope.cancel = function() {
        $location.path('/');
    };

    // simbad query
    $scope.simbad_query = function(){
        console.log($scope.target.name);
        var query_params = {'id': $scope.target.name};

        $http({
            method: 'GET',
            url: '/api/simbad/',
            params: JSON.parse(JSON.stringify(query_params))
        }).then(function (res) {
            if (res.data.success) {
                $scope.target.ra = res.data.data.ra;
                $scope.target.dec = res.data.data.dec;
                $scope.target.epoch = res.data.data.epoch;
                $scope.target.proper_motion_ra = res.data.data.proper_motion_ra;
                $scope.target.proper_motion_dec = res.data.data.proper_motion_dec;
            } else {
                console.log("error");
                console.log(res);
            }

        }, function(err) {
            console.log(err);
        });
    };

    // date picker


    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.format = 'yyyy-MM-dd HH:mm:ss';

    $scope.popups = [{'start': false, 'end': false}];


    $scope.open_date_picker_start = function (index) {
        $scope.popups[index].start = true;
    };

    $scope.open_date_picker_end = function (index) {
        $scope.popups[index].end = true;
    };

    $scope.verify = function() {
        console.log($scope.windows);
    };



});
