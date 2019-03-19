var app = angular.module('requestGroupsApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
        templateUrl: '/views/index.view.html',
        controller: 'indexController'
    }).otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
});
