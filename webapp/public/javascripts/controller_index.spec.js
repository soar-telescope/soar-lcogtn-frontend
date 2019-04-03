describe('indexController', function () {
    var $controller, $rootScope, $window, $scope, $http, $location;

    beforeEach(function () {
        module('requestGroupsApp');

    });

    beforeEach(function () {

        inject(function (_$controller_, _$rootScope_, _$window_, _$http_, _$location_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $window = _$window_;
            $http = _$http_;
            $location = _$location_;
        });
    });

    describe('$scope.is_active', function () {

        it('Should change $scope.popups[$index].end to true and maintain *.start false', function () {
            $scope = $rootScope.$new();

            var controller = $controller('indexController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });



            expect($scope.current_active).toBeNull();
            $scope.current_active = 1;
            expect($scope.is_active($scope.current_active)).toBeTruthy();
            expect($scope.is_active(2)).toBeFalsy();
        })
    });

    describe('$scope.change_active', function () {

        it('Should change $scope.current_active to new id', function () {
            $scope = $rootScope.$new();

            var controller = $controller('indexController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });



            expect($scope.current_active).toBeNull();
            $scope.change_active(1);
            expect($scope.current_active).toBe(1);
            $scope.change_active(1);
            expect($scope.current_active).toBeNull();
        })
    });

    describe('$scope.page_changed', function () {

        xit('Should manage logic for pagination including request new data', function () {
            $scope = $rootScope.$new();

            var controller = $controller('indexController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            $scope.reqGroups = {next: 'http://observation-portal-dev.lco.global/api/requestgroups/?limit=10&offset=10'};
            $scope.pagination.current_page = 2;
            $scope.page_changed();
            expect($scope.get_data).toHaveBeenCalledWith('http://observation-portal-dev.lco.global/api/requestgroups/?limit=10&offset=10');
        })
    });

    describe('$scope.get_query_string_params', function () {

        it('Should isolate query string parameters and return them as a json', function () {
            $scope = $rootScope.$new();

            var controller = $controller('indexController',
                {
                    $scope: $scope,
                    $window: $window,
                    $location: $location,
                    $http: $http
                });

            var params = $scope.get_query_string_params('http://observation-portal-dev.lco.global/api/requestgroups/?limit=10&offset=10');
            expect(params.limit).toBe('10');
            expect(params.offset).toBe('10');
        })
    });





});
