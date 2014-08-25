var unisheduleApp = angular.module('unisheduleApp', ['ngRoute', 'teachersModule']);

unisheduleApp
    .controller('appCtrl', function ($scope, $location) {
        $scope.title = "Расписание";

        $scope.isActive = function (viewLocation) {
            return (viewLocation === $location.path());
        };
    })
    .controller('teachersCtrl', function ($scope) {
        $scope.title = 'Преподаватели';
    })
    .controller('roomsController', function ($scope) {
        $scope.title = 'Аудитории';
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/groups.html',
                controller: 'appCtrl'
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
