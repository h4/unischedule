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

        if ($cookies.kiosk === "1") {
            document.onmousedown = function(e) {
                if (event.button==2) {
                    return false;
                }
            };

            document.oncontextmenu = function(e) {
                return false;
            };

            angular.element(document.body).addClass('kiosk');
        }

        $scope.isActive = function (viewLocation) {
            return (viewLocation === $scope.tabLocation);
        };
    });
