var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ScheduleCtrl',
    ['$scope', '$rootScope', '$http', '$routeParams', 'APIUrls', 'scheduleType',
        function ($scope, $rootScope, $http, $routeParams, APIUrls, type) {
            $scope.error = false;

            switch (type) {
                case 'room':
                    $rootScope.tabLocation = '/buildings';
                    $scope.url = APIUrls.getUrl("roomSchedule", $routeParams.id, $routeParams.room_id);
                    $scope.getTitle = function (data) {
                        return 'Расписание аудитории ' + data.room.name;
                    };
                    break;
                case 'teacher':
                    $rootScope.tabLocation = '/teachers';
                    $scope.url = APIUrls.getUrl("teacherSchedule", $routeParams.id);
                    $scope.getTitle = function (data) {
                        return 'Расписание преподавателя ' + data.lecturer.full_name;
                    };
                    break;
                default :
                    $rootScope.tabLocation = '/';
                    $scope.url = APIUrls.getUrl("schedule", $routeParams.id);
                    $scope.getTitle = function (data) {
                        return 'Расписание группы ' + data.group.name;
                    };
                    break;
            }

            $scope.schedule = [];
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

            function isCurrentWeek(week) {
                var startDate = new Date(week.date_start),
                    endDate = new Date(week.date_end),
                    today = new Date();

                return today > startDate && today <= endDate;
            }

            function getDayDate(week, day) {
                return new Date(week.date_start).setHours((day - 1) * 24);
            }

            $http
                .get($scope.url)
                .success(function (data) {
                    var highlightToday,
                        todaysDay = new Date().getDay();

                    if (data.error) {
                        $scope.error = true;
                        $scope.errorMessage = data.text;
                        return;
                    }

                    $scope.error = false;
                    highlightToday = isCurrentWeek(data.week);
                    $scope.schedule = data.days
                        .map(function (day) {
                            day.lessons.forEach(function (lesson) {
                                lesson.startPosition = (lesson.time_start.split(":")[0] - 8) / 2 + 1;
                                lesson.className = 'lesson_start_' + lesson.startPosition;
                            });

                            day.today = (highlightToday && todaysDay === day.weekday % 7) ?
                                'yes' : 'no';

                            return day;
                        })
                        .sort(function (cur, prev) {
                            return cur.weekday - prev.weekday;
                        });

                    for (var i = 1; i < 7; i++) {
                        if (! $scope.schedule[i - 1]) {
                            $scope.schedule.push({weekday: i, lessons: []});
                        }
                        if ($scope.schedule[i - 1].weekday !== i) {
                            $scope.schedule.splice(i - 1, 0, {weekday: i, lessons: []});
                        }
                    }

                    $scope.schedule.forEach(function(day) {
                        day.date = getDayDate(data.week, day.weekday);
                    });

                    $rootScope.subtitle = $scope.getTitle(data) +
                        ' на неделю с ' + transformDate(data.week.date_start) +
                        ' по ' + transformDate(data.week.date_start) +
                        ' (' + getWeekType(data.week) + ')';
                    $scope.colWidth = Math.ceil((1 / $scope.schedule.length) * 100);
                });
        }]);
