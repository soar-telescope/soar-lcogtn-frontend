describe('Coordinates conversion directives', function () {
    var $scope, $rootScope, $compile;

    beforeEach(function () {
        module('requestGroupsApp');
    });

    beforeEach(function () {
        module(function ($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        })
    });

    beforeEach(inject(function (_$rootScope_, _$compile_) {
       $compile = _$compile_;
       $rootScope = _$rootScope_;

       $scope = $rootScope.$new();
       var element = angular.element("<input right-ascension-coord ng-model='ra_hex'>");
       var compiled = $compile(element);
       compiled($scope);

       $scope.$digest();
    }));

    xit('Should convert hexagesimal RA to float', function () {


        $scope.ra_hex = '05:35:17.3';
        console.log($scope.ra_hex);



    })
});
