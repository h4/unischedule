var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ScheduleCtrl',
    ['$scope', '$rootScope', '$http', '$routeParams', 'APIUrls', 'scheduleType',
        function ($scope, $rootScope, $http, $routeParams, APIUrls, type) {
            console.log(arguments);

            $scope.error = false;

            switch (type) {
                case 'room':
                    $scope.title = "Расписание аудитории";
                    $rootScope.tabLocation = '/buildings';
                    $scope.url = APIUrls.getUrl("roomSchedule", $routeParams.id, $routeParams.room_id);
                    break;
                case 'teacher':
                    $scope.title = "Расписание преподавателя";
                    $rootScope.tabLocation = '/teachers';
                    $scope.url = APIUrls.getUrl("teacherSchedule", $routeParams.id);
                    break;
                default :
                    $scope.title = "Расписание группы";
                    $rootScope.tabLocation = '/';
                    $scope.url = APIUrls.getUrl("schedule", $routeParams.id);
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
                    $rootScope.subtitle = $scope.title + ' ' + data.group.name +
                        ' на неделю с ' + transformDate(data.week.date_start) +
                        ' по ' + transformDate(data.week.date_start) +
                        ' (' + getWeekType(data.week) + ')';
                    $scope.colWidth = Math.ceil((1 / data.days.length) * 100);
                });
        }]);
