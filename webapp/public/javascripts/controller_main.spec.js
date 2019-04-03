describe('mainController', function () {
    beforeEach(function () {
        module('requestGroupsApp');
    });

    var $controller, $rootScope, $location;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $location = _$location_;
    }));

    describe('$scope.page_title', function () {
        it('sets the correct value for the page title', function () {
            var $scope = $rootScope.$new();
            var controller = $controller('mainController', {$scope: $scope});
            expect($scope.page_title).toEqual('SOAR-LCO Interface');
        });
    });

    describe('$scope.settings', function () {
        it('Should set path to /settings', function () {
            var $scope = $rootScope.$new();
            var controller = $controller('mainController', {$scope: $scope});
            expect($location.path()).toBe('/');
            $scope.settings();
            expect($location.path()).toBe('/settings');
        });
    });
});
