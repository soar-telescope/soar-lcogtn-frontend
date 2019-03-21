var app = angular.module('requestGroupsApp');

app.controller('mainController', function ($scope) {
    $scope.page_title = 'SOAR-LCO Interface'
    console.log('Loading main controller');
});

app.controller('indexController', function($scope, $http, $window) {
    $scope.current_active = null;
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

    $scope.reqGroups = null;


    $scope.get_data = function () {
        $http({
            method: 'GET',
            url: '/api/requestgroups',
            headers: {
                'Authorization': 'Token ' + 'c377c2bfbaafd9089b12a1b3590fc8b0d39c5686'
            }
        }).then(function (res) {
            if (res.data.sucess) {
                $scope.reqGroups = res.data.data;
                if ($scope.current_active === null) {
                    $scope.current_active = $scope.reqGroups.count;
                };
            } else {
                console.log("error");
                console.log(res);
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
                'Authorization': 'Token ' + 'c377c2bfbaafd9089b12a1b3590fc8b0d39c5686'
            },
        }).then(function (res) {
            if (res.data.sucess) {
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


app.controller('addOneController', function($scope, $http, $location) {
    $scope.configuration_types = ['SPECTRUM', 'ARC', 'LAMP_FLAT'];
    $scope.target_types = ['SIDEREAL', 'NON-SIDEREAL'];
    $scope.rot_modes = ['SKY', 'FLOAT', 'VERTICAL', 'VFLOAT'];
    $scope.target = {
        'dec': -5.27,
        'epoch': 2000,
        'name': 'm43',
        'proper_motion_dec': 0.0,
        'proper_motion_ra': 0.0,
        'ra': 83.879,
        'type': 'SIDEREAL'};

    $scope.instrument_configs = [{
        'bin_x': 2,
        'bin_y': 2,
        'exposure_count': 1,
        'exposure_time': 360,
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
        'start': '2019-03-20 22:50:42',
        'end': '2019-03-25 23:58:42'}];

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
        'proposal': 'NOAO2019B-9990'};

    create_request_group = function() {
        $scope.request_group = Object.assign(
            $scope.request_group_general,
            {'requests': $scope.requests})};

    $scope.post_data = function () {
        create_request_group();
        console.log($scope.request_group);
        return 0;
        $http({
            method: 'POST',
            url: '/api/requestgroups',
            headers: {
                'Authorization': 'Token ' + 'c377c2bfbaafd9089b12a1b3590fc8b0d39c5686'
            },
            data: $scope.request_group
        }).then(function (res) {
            if (res.data.sucess) {
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
        console.log(new_conf);
        $scope.configurations.push(new_conf);
        console.log($scope.configurations);
    };

    $scope.remove_configuration = function(index) {
        $scope.configurations.splice(index, 1);
    };

    $scope.cancel = function() {
        $location.path('/');
    };

});
