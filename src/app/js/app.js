var unisheduleApp = angular.module('unisheduleApp', ['ngRoute', 'ngAnimate', 'teachersModule']);

unisheduleApp
    .controller('appCtrl', function ($scope, $location) {
        $scope.title = "Санкт-Петерубргский государственный политехнический университет";

        $scope.navigate = function (path) {
            $location.path(path);
        };

        $scope.searchString = "";

        $scope.$on('addSymbol', function (e, symbol) {
            $scope.searchString += symbol;
        });

        $scope.$on('removeSymbol', function () {
            $scope.searchString = $scope.searchString.slice(0, -1);
        });

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
