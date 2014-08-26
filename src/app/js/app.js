var unisheduleApp = angular.module('unisheduleApp', ['ngRoute', 'teachersModule']);

unisheduleApp
    .controller('appCtrl', function ($scope, $location) {
        $scope.title = "Расписание";

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
            .when('/faculty/:id/chairs', {
                templateUrl: 'pages/chairs.html'
            })
            .when('/chair/:id/groups', {
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
;
