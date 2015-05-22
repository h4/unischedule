var unisheduleApp = angular.module('unisheduleApp', ['ngRoute', 'ngAnimate', 'ngCookies']);

unisheduleApp
    .controller('appCtrl', [
        '$scope', '$location', '$cookies', '$rootScope', '$timeout',
        function ($scope, $location, $cookies, $rootScope, $timeout) {
        var maxPageLiveTime = 3;

        $scope.title = "Санкт-Петербургский политехнический университет Петра Великого";

        if ($location.search().kiosk) {
            $cookies.kiosk = $location.search().kiosk;
        }

        $scope.navigate = function (path) {
            $location.path(path);
        };

        if ($cookies.kiosk === "1") {
            var timeoutId;

            document.onmousedown = function(e) {
                if (event.button==2) {
                    return false;
                }
            };

            document.oncontextmenu = function(e) {
                return false;
            };

            $rootScope.kioskMode = true;

            angular.element(document.body).addClass('kiosk');

            $rootScope.$on('$locationChangeSuccess', function () {
                if (timeoutId) {
                    $timeout.cancel(timeoutId);
                }
                timeoutId = $timeout(function() {
                    $scope.navigate('/');
                }, maxPageLiveTime * 60 * 1000);
            });
        }


        $scope.isActive = function (viewLocation) {
            return (viewLocation === $scope.tabLocation);
        };
    }]);
