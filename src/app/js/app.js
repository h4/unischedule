var unisheduleApp = angular.module('unisheduleApp', ['ngRoute', 'ngAnimate']);

unisheduleApp
    .controller('appCtrl', function ($scope, $location) {
        $scope.title = "Санкт-Петербургский государственный политехнический университет";

        $scope.navigate = function (path) {
            $location.path(path);
        };

        $scope.isActive = function (viewLocation) {
            return (viewLocation === $scope.tabLocation);
        };
    });
