var unisheduleApp = angular.module('unisheduleApp', ['ngRoute', 'teachersModule']);

unisheduleApp
    .controller('appCtrl', function ($scope, $location) {
        $scope.title = "Санкт-Петерубргский государственный политехнический университет";

        $scope.navigate = function(path) {
            $location.path(path);
        };

        $scope.isActive = function (viewLocation) {
            return (viewLocation === $location.path());
        };
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/faculties.html'
            })
            .when('/faculty/:id/groups', {
                templateUrl: 'pages/groups.html'
            })
            .when('/schedule/:id', {
                templateUrl: 'pages/schedule.html'
            })
            .when('/teachers', {
                templateUrl: 'pages/teachers.html'
            })
            .when('/rooms', {
                templateUrl: 'pages/rooms.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
