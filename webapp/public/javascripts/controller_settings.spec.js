describe('settingsController', function () {
    var $controller, $rootScope, $window, $scope;

    beforeEach(function () {
        module('requestGroupsApp');

    });

    beforeEach(function () {

        inject(function (_$controller_, _$rootScope_, _$window_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $window = _$window_;
        });
    });

    describe('$scope.add_token', function () {
        var store = {};
        it('Adds a token to localStorage', function () {
            $scope = $rootScope.$new();
            var controller = $controller('settingsController', {$scope: $scope, $window: $window});
            spyOn($window.localStorage, 'getItem').and.callFake(function (key) {
                return store[key] || null;
            });
            
            spyOn($window.localStorage, 'setItem').and.callFake(function (key, value) {
                return store[key] = value;
            });
            
            // spyOn($window.localStorage, 'removeItem').and.callFake(function (key) {
            //     delete store[key];
            // });


            $scope.new_token = 'testoken';
            $scope.add_token();
            expect($window.localStorage.getItem('lcoToken')).toBe('Token testoken');
        })
    });

    describe('$scope.token_exist', function () {
        var store = {};
        it('Checks if a token exist in localStorage', function () {
            $scope = $rootScope.$new();
            var controller = $controller('settingsController', {$scope: $scope, $window: $window});
            spyOn($window.localStorage, 'getItem').and.callFake(function (key) {
                return store[key] || null;
            });

            spyOn($window.localStorage, 'setItem').and.callFake(function (key, value) {
                return store[key] = value;
            });

            expect($scope.token_exist()).toBeFalsy();

            $scope.new_token = 'testoken';
            $scope.add_token();
            expect($scope.token_exist()).toBeTruthy();

            // check invalid token format
            $window.localStorage.setItem('lcoToken', 'token ' + 'not a token');
            expect($scope.token_exist()).toBeFalsy();
        })
    })

    describe('$scope.delete_token', function () {
        var store = {};
        it('Adds a token to localStorage', function () {
            $scope = $rootScope.$new();
            var controller = $controller('settingsController', {$scope: $scope, $window: $window});
            spyOn($window.localStorage, 'getItem').and.callFake(function (key) {
                return store[key] || null;
            });

            spyOn($window.localStorage, 'setItem').and.callFake(function (key, value) {
                return store[key] = value;
            });

            spyOn($window.localStorage, 'removeItem').and.callFake(function (key) {
                delete store[key];
            });


            $scope.new_token = 'testoken';
            $scope.add_token();
            expect($window.localStorage.getItem('lcoToken')).toBeTruthy();
            $scope.delete_token();
            expect($window.localStorage.getItem('lcoToken')).toBeFalsy();
        })
    });
});
