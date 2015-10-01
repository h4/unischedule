var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('clock', ['$compile', '$rootScope', '$sce', function ($compile, $rootScope, $sce) {
        return {
            restrict: 'E',
            scope: {
                interval: '=interval',
                autoStart: '&autoStart'
            },

            controller: ['$scope', '$element', '$attrs', '$interval', '$http', 'APIUrls', function ($scope, $element, $attrs, $interval, $http, APIUrls) {
                $scope.infoInterval = 5 * 60 * 1000;
                $scope.autoStart = $attrs.autoStart || $attrs.autostart;
                $scope.hoursElem = angular.element($element[0].querySelector('.clock__hours'));
                $scope.minutesElem = angular.element($element[0].querySelector('.clock__minutes'));
                $scope.now = new Date();
                $scope.weekType = '';

                $scope.tick = function() {
                    $scope.now = new Date();
                };

                $scope.getInfo = function() {
                    $http
                        .get(APIUrls.getUrl('info'))
                        .success(function (data) {
                            if ('messages' in data) {
                                $rootScope.messages = data.messages.map(function(message) {
                                    return $sce.trustAsHtml(message);
                                });

                                $rootScope.showMessages = Boolean(data.messages.length);
                            }

                            if ('is_odd_week' in data) {
                                $scope.weekType = data.is_odd_week ? 'Нечётная неделя' : 'Чётная неделя';
                            }
                        });
                };

                $scope.start = function() {
                    $scope.getInfo();
                    $interval($scope.tick, $scope.interval);
                    $interval($scope.getInfo, $scope.infoInterval);
                };

                if ($scope.autoStart === undefined || $scope.autoStart === true) {
                  $scope.start();
                }
            }],

            templateUrl: 'app/js/clock/clock.tpl.html'
        };
    }]);
