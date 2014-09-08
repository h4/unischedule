var unisheduleApp = angular.module('unisheduleApp', ['ngRoute', 'ngAnimate', 'ngCookies']);

unisheduleApp
    .controller('appCtrl', function ($scope, $location, $cookies) {
        $scope.title = "Санкт-Петербургский государственный политехнический университет";

        if ($location.search().kiosk) {
            $cookies.kiosk = $location.search().kiosk;
        }

        $scope.navigate = function (path) {
            $location.path(path);
        };

        $scope.isActive = function (viewLocation) {
            return (viewLocation === $scope.tabLocation);
        };
    });
