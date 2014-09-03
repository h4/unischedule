var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ScheduleCtrl',
    ['$scope', '$rootScope', '$http', '$routeParams', 'APIUrls',
        function ($scope, $rootScope, $http, $routeParams, APIUrls) {
            $rootScope.tabLocation = '/';
            $scope.schedule = [];
            $scope.title = "Расписание группы";
            $scope.days = [
                '', 'Понедельник', 'Вторник', 'Cреда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
            ];
            $scope.lessonTypes = [
                'Упражнения',
                'Лабораторная',
                'Лекция',
                'Семинар',
                'Консультация',
                'Внеучебное занятие',
                'Зачет',
                'Экзамен'
            ];

            function transformDate(str) {
                // todo: вынести в какой-то внешний сервис
                var parts = str.split('-');
                return parts[2] + '.' + parts[1] + '.' + parts[0];
            }

            function getWeekType(week) {
                return week.is_odd ? 'чётная неделя' : 'нечётная неделя';
            }

            $http
                .get(APIUrls.getUrl("schedule", $routeParams.id))
                .success(function (data) {
                    $scope.schedule = data.days
                        .map(function (day) {
                            day.lessons.forEach(function (lesson) {
                                lesson.startPosition = (lesson.time_start.split(":")[0] - 8) / 2 + 1;
                                lesson.className = 'lesson_start_' + lesson.startPosition;
                            });

                            return day;
                        });
                    $rootScope.subtitle = $scope.title + ' ' + data.group.name +
                        ' на неделю с ' + transformDate(data.week.date_start) +
                        ' по ' + transformDate(data.week.date_start) +
                        ' (' + getWeekType(data.week) + ')';
                    $scope.colWidth = Math.ceil((1 / data.days.length) * 100);
                });
        }]);
