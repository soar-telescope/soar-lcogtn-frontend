describe('addOneController', function () {
    var $controller, $rootScope, $window, $scope, $http, $location, $httpBackend;

    beforeEach(function () {
        module('requestGroupsApp');

    });

    beforeEach(function () {

        inject(function (_$controller_, _$rootScope_, _$window_, _$http_, _$location_, _$httpBackend_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $window = _$window_;
            $http = _$http_;
            $location = _$location_;
            $httpBackend = _$httpBackend_
        });
    });

    describe('create_request_group', function () {

        it('Should create a valid object that contains all information about the request', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });
            // var store = {};

            // spyOn($window.localStorage, 'getItem').and.callFake(function (key) {
            //     return store[key] || null;
            // });
            //
            // spyOn($window.localStorage, 'setItem').and.callFake(function (key, value) {
            //     return store[key] = value;
            // });

            // spyOn($window.localStorage, 'removeItem').and.callFake(function (key) {
            //     delete store[key];
            // });

            expect($scope.request_group).toBeUndefined();
            $scope.create_request_group();
            expect($scope.request_group).toBeDefined();
        })
    });


    describe('$scope.post_data', function () {

        xit('Build request group and submit (POST) to api', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });
            var store = {};

            spyOn($window.localStorage, 'getItem').and.callFake(function (key) {
                return store[key] || null;
            });

            spyOn($window.localStorage, 'setItem').and.callFake(function (key, value) {
                return store[key] = value;
            });

            spyOn($window.localStorage, 'removeItem').and.callFake(function (key) {
                delete store[key];
            });

            expect($scope.request_group).toBeUndefined();
            $scope.create_request_group();
            expect($scope.request_group).toBeDefined();
        })
    });


    describe('$scope.add_one_configuration', function () {

        it('Should replicate last element of array at the end', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            expect($scope.configurations.length).toBe(1);
            expect($scope.instrument_configs.length).toBe(1);
            $scope.add_one_configuration();
            expect($scope.configurations.length).toBe(2);
            expect($scope.instrument_configs.length).toBe(2);
        })
    });

    describe('$scope.remove_configuration', function () {

        it('Should delete element of array by index', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });
            $scope.add_one_configuration();
            expect($scope.configurations.length).toBe(2);
            expect($scope.instrument_configs.length).toBe(2);

            $scope.remove_configuration(1);
            expect($scope.configurations.length).toBe(1);
            expect($scope.instrument_configs.length).toBe(1);


        })
    });


    describe('$scope.add_one_window', function () {

        it('Should duplicate last element of time window', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            expect($scope.windows.length).toBe(1);
            expect($scope.windows.length).toBe(1);
            $scope.add_one_window();
            expect($scope.windows.length).toBe(2);
            expect($scope.windows.length).toBe(2);
        })
    });

    describe('$scope.remove_window', function () {

        it('Should delete element of array by index', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            $scope.add_one_window();
            expect($scope.windows.length).toBe(2);
            expect($scope.windows.length).toBe(2);

            $scope.remove_window(1);
            expect($scope.windows.length).toBe(1);
            expect($scope.windows.length).toBe(1);


        })
    });


    describe('$scope.disable_inst_conf', function () {

        it('Should return true if $scope.configurations.length > 1', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            expect($scope.configurations.length).toBe(1);
            expect($scope.instrument_configs.length).toBe(1);
            expect($scope.disable_inst_conf()).toBeFalsy();
            $scope.add_one_configuration();
            expect($scope.configurations.length).toBe(2);
            expect($scope.instrument_configs.length).toBe(2);
            expect($scope.disable_inst_conf()).toBeTruthy();
        })
    });

    describe('$scope.cancel', function () {

        it('Should redirect path to /', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            $location.path('/testpath');

            expect($location.path()).toBe('/testpath');
            $scope.cancel();
            expect($location.path()).toBe('/');
        })
    });

    // describe('$scope.simbad_query', function () {
    //
    //     it('Should query API and retrieve coordinate information from simbad', function () {
    //         $scope = $rootScope.$new();
    //
    //         var controller = $controller('addOneController',
    //             {
    //                 $scope: $scope,
    //                 $window: $window,
    //                 $location: $location,
    //                 $http: $http
    //             });
    //
    //         expect($scope.target.ra).toBeNull();
    //         expect($scope.target.dec).toBeNull();
    //         expect($scope.target.epoch).toBeNull();
    //         expect($scope.target.name).toBeNull();
    //         expect($scope.target.proper_motion_ra).toBeNull();
    //         expect($scope.target.proper_motion_dec).toBeNull();
    //         expect($scope.target.type).toBe('SIDEREAL');
    //
    //         $scope.target.name = 'm42';
    //
    //         $httpBackend.when('GET', '/api/simbad/').respond(200,
    //             [{success: true,
    //                 data:
    //                     {
    //                         ra: 13.5,
    //                         dec: 5.6,
    //                         epoch: 2000,
    //                         equinox: 'J2000',
    //                         proper_motion_ra: 0,
    //                         proper_motion_dec: 0
    //                     }}]);
    //
    //         $scope.simbad_query();
    //         $httpBackend.flush();
    //
    //         expect($scope.target.ra).toBeNull();
    //         expect($scope.target.dec).toBeNull();
    //         expect($scope.target.epoch).toBeNull();
    //         expect($scope.target.name).toBe('m42');
    //         expect($scope.target.proper_motion_ra).toBeNull();
    //         expect($scope.target.proper_motion_dec).toBeNull();
    //         expect($scope.target.type).toBe('SIDEREAL');
    //     })
    // });

    describe('$scope.open_date_picker_start', function () {

        it('Should change $scope.popups[$index].start to true and maintaine *.end false', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            expect($scope.popups[0].start).toBeFalsy();
            expect($scope.popups[0].end).toBeFalsy();
            $scope.open_date_picker_start(0);
            expect($scope.popups[0].start).toBeTruthy();
            expect($scope.popups[0].end).toBeFalsy();
        })
    });

    describe('$scope.open_date_picker_end', function () {

        it('Should change $scope.popups[$index].end to true and maintain *.start false', function () {
            $scope = $rootScope.$new();

            var controller = $controller('addOneController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            expect($scope.popups[0].start).toBeFalsy();
            expect($scope.popups[0].end).toBeFalsy();
            $scope.open_date_picker_end(0);
            expect($scope.popups[0].start).toBeFalsy();
            expect($scope.popups[0].end).toBeTruthy();
        })
    });







});
