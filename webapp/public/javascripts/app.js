var app = angular.module('requestGroupsApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
        templateUrl: '/views/index.view.html',
        controller: 'indexController'
        })
        .when('/addone', {
            templateUrl: '/views/addone.view.html',
            controller: 'addOneController'
        }).when('/settings', {
            templateUrl: '/views/settings.view.html',
            controller: 'settingsController'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
});
