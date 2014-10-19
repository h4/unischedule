var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('clock', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                interval: '=interval',
                autoStart: '&autoStart'
            },

            controller: ['$scope', '$element', '$attrs', '$interval', function ($scope, $element, $attrs, $interval) {
                $scope.autoStart = $attrs.autoStart || $attrs.autostart;
                $scope.hoursElem = angular.element($element[0].querySelector('.clock__hours'));
                $scope.minutesElem = angular.element($element[0].querySelector('.clock__minutes'));
                $scope.now = new Date();

                $scope.tick = function() {
                    $scope.now = new Date();
                };

                $scope.start = function() {
                    $interval($scope.tick, $scope.interval);
                };

                if ($scope.autoStart === undefined || $scope.autoStart === true) {
                  $scope.start();
                }
            }],

            templateUrl: 'app/js/clock/clock.tpl.html'
        };
    }]);
