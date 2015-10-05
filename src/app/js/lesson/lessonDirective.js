var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp
    .directive('lesson', [function () {
        var timeToNumber = function (timeString) {
            var timeArr = timeString.split(':');

            return Number(timeArr[0]) + Number(timeArr[1])/60
        };

        return {
            restrict: 'E',
            scope: {
                navigate: '=',
                lesson: '=lesson',
                scheduleType: '=scheduletype',
                hourScale: '=hourscale',
                dayStart: '=daystart',
                gap: '=gap'
            },
            controller: ['$scope', '$element', '$animate',
                function ($scope, $element, $animate) {
                    var duration = timeToNumber($scope.lesson.time_end) - timeToNumber($scope.lesson.time_start),
                        height = duration * $scope.hourScale - $scope.gap,
                        top = (timeToNumber($scope.lesson.time_start) - $scope.dayStart) * $scope.hourScale;

                    $element.css('height', height + 'px');
                    $element.css('min-height', height + 'px');
                    $element.css('top', top + 'px');

                    $scope.showTeacher = $scope.scheduleType !== 'teacher';
                    $scope.showRoom = $scope.scheduleType !== 'room';
                    $scope.showGroups = $scope.scheduleType !== 'group';
                }],
            templateUrl: 'app/js/lesson/lesson.tpl.html'
        }
    }]);
