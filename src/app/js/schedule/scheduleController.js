var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ScheduleCtrl',
    ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$filter', 'APIUrls', 'scheduleType',
        function ($scope, $rootScope, $http, $location, $routeParams, $filter, APIUrls, type) {
            $scope.error = false;

            $scope.prevWeek = function() {
                var prev_start = $scope.start_date.setHours(-7 * 24);

                $location.search('date', $filter('date')(prev_start, 'yyyy-MM-dd'));
            };

            $scope.nextWeek = function() {
                var next_start = $scope.start_date.setHours(7 * 24);

                $location.search('date', $filter('date')(next_start, 'yyyy-MM-dd'));
            };

            switch (type) {
                case 'room':
                    $rootScope.tabLocation = '/buildings';
                    $scope.url = APIUrls.getUrl("roomSchedule", $routeParams.id, $routeParams.room_id, $routeParams.date);
                    $scope.getTitle = function (data) {
                        return 'Расписание аудитории ' + data.room.name;
                    };
                    break;
                case 'teacher':
                    $rootScope.tabLocation = '/teachers';
                    $scope.url = APIUrls.getUrl("teacherSchedule", $routeParams.id, $routeParams.date);
                    $scope.getTitle = function (data) {
                        return 'Расписание преподавателя ' + data.lecturer.full_name;
                    };
                    break;
                default :
                    $rootScope.tabLocation = '/';
                    $scope.url = APIUrls.getUrl("schedule", $routeParams.id, $routeParams.date);
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
                return $filter('date')(new Date(str), 'dd.MM.yyyy');
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
                        $scope.start_date = $location.search().date ?
                            new Date($location.search().date) : new Date();

                        console.log($location.search().date, $scope.start_date);

                        $rootScope.subtitle = '';
                        $scope.error = true;
                        $scope.errorMessage = data.text;
                        return;
                    }

                    $scope.start_date = new Date(data.week.date_start);

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
                        ' по ' + transformDate(data.week.date_end) +
                        ' (' + getWeekType(data.week) + ')';
                    $scope.colWidth = Math.ceil((1 / $scope.schedule.length) * 100);
                });
        }]);
