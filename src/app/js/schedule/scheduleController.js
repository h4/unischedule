var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.controller('ScheduleCtrl',
    ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$filter', 'APIUrls', 'scheduleType', 'Schedule',
        'ScheduleService',
        function ($scope, $rootScope, $http, $location, $routeParams, $filter, APIUrls, type, Schedule, ScheduleService) {
            $scope.error = false;
            $scope.title = '';
            $scope.isCurrentWeek = false;

            $location.search(['q', 'kind'], null);

            $scope.prevWeek = function () {
                var prev_start = $scope.start_date.setHours(-7 * 24);

                $location.search('date', $filter('date')(prev_start, 'yyyy-MM-dd'));
            };

            $scope.nextWeek = function () {
                var next_start = $scope.start_date.setHours(7 * 24);

                $location.search('date', $filter('date')(next_start, 'yyyy-MM-dd'));
            };

            $scope.getTime = function() {
                var now = new Date(),
                    start = new Date();

                start.setHours(8);
                start.setMinutes(0);
                start.setSeconds(0);

                return Math.round((now - start) / 60 / 1000);
            };

            switch (type) {
                case 'room':
                    $rootScope.tabLocation = '/buildings';
                    $scope.url = APIUrls.getUrl("roomSchedule", $routeParams.id, $routeParams.room_id, $routeParams.date);
                    $scope.getTitle = function (data) {
                        var building = '';

                        if (data.room.building) {
                            building = data.room.building.name || data.room.building.abbr || '';
                            building = building !== '' ? ' (' + building + ')' : '';
                        }

                        return 'Расписание аудитории ' + data.room.name + building;
                    };
                    break;
                case 'teacher':
                    $rootScope.tabLocation = '/teachers';
                    $scope.url = APIUrls.getUrl("teacherSchedule", $routeParams.id, $routeParams.date);
                    $scope.getTitle = function (data) {
                        return data.teacher.full_name;
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
                'Экзамен',
                'Доп. экзамен'
            ];

            function getWeekType(week) {
                return week.is_odd ? 'нечётная неделя' : 'чётная неделя';
            }

            function isCurrentWeek(week) {
                var startDate = dateFromString(week.date_start),
                    endDate = dateFromString(week.date_end),
                    today = new Date();

                return today > startDate && today <= endDate;
            }

            function getDayDate(week, day) {
                var startDate = dateFromString(week.date_start);

                return startDate.setHours((day - 1) * 24);
            }

            function dateFromString(dateString) {
                var dateArr = dateString.split('.');

                return new Date(dateArr[0], (dateArr[1] - 1), dateArr[2]);
            }

            $scope.checkDoubles = function (e) {
                var elem = angular.element(e.currentTarget),
                    lessons = elem.parent()[0],
                    lessonId,
                    doubles;

                lessonId = elem.attr('class').split(' ').reduce(function (prev, cur) {
                    if (cur.indexOf('lesson_start_') !== -1) {
                        return cur;
                    } else {
                        return prev;
                    }
                }, '');

                doubles = lessons.querySelectorAll('.' + lessonId);

                if (doubles.length === 1) {
                    return;
                }

                angular.forEach(doubles, function (elem) {
                    angular.element(elem).toggleClass('lesson_double');
                });
            };

            $scope.checkOverlaps = function (e) {
                var elem = angular.element(e.currentTarget),
                    lessons = elem.parent(),
                    overlaps;

                overlaps = lessons[0].querySelectorAll('.lesson_overlaps:nth-of-type(2)');

                lessons.prepend(angular.element(overlaps).detach());
            };

            $scope._isCurrentLesson = function(lesson) {
                var now = new Date().getTime();
                var lessonStartArr = lesson.time_start.split(':');
                var lessonEndArr = lesson.time_end.split(':');
                var lessonStart = new Date().setHours(lessonStartArr[0], lessonStartArr[1]);
                var lessonEnd = new Date().setHours(lessonEndArr[0], lessonEndArr[1]);

                return lessonStart <= now && now <= lessonEnd;
            };

            var items = ScheduleService
                .getResult({id: $routeParams.id})
                .then(function(data) {
                    var highlightToday,
                        todaysDay = new Date().getDay();

                    $scope.start_date = dateFromString(data.week.date_start);

                    $scope.error = false;
                    highlightToday = isCurrentWeek(data.week);
                    $scope.isEmpty = data.days.length === 0;

                    $scope.schedule = data.schedule;

                    for (var i = 1; i < 7; i++) {
                        if (!$scope.schedule[i - 1]) {
                            $scope.schedule.push({weekday: i, lessons: [], today: (highlightToday && todaysDay === i) ?
                                'yes' : 'no'});
                        }
                        if ($scope.schedule[i - 1].weekday !== i) {
                            $scope.schedule.splice(i - 1, 0, {weekday: i, lessons: [], today: (highlightToday && todaysDay === i) ?
                                'yes' : 'no'});
                        }
                    }

                    $scope.schedule.forEach(function (day) {
                        day.date = getDayDate(data.week, day.weekday);
                    });

                    var timeScale = $scope.schedule
                        .map(function(day) {
                            return day.lessons;
                        })
                        .reduce(function(prev, curr) {
                            return prev.concat(curr);
                        }, [])
                        .map(function(lesson) {
                            var now = new Date(),
                                timeStart = lesson.time_start.split(":"),
                                timeEnd = lesson.time_end.split(":");

                            return {
                                time_start: now.setHours(timeStart[0], timeStart[1]),
                                time_end: now.setHours(timeEnd[0], timeEnd[1])
                            }
                        });

                    var timelineStart = Math.min.apply(Math, timeScale.map(function(item) {return item.time_start}));
                    var timelineEnd = Math.max.apply(Math, timeScale.map(function(item) {return item.time_end}));

                    timelineStart = new Date(timelineStart);
                    timelineEnd = new Date(timelineEnd);

                    // timelineStart = timelineStart.getHours() > 15 ? timelineStart : new Date(timelineStart.setHours(8, 0));
                    timelineStart = new Date(timelineStart.setHours(8, 0));
                    timelineEnd = timelineEnd.getMinutes() === 0 ? timelineEnd : new Date(timelineEnd.setHours(timelineEnd.getHours() + 1));

                    $scope.timelineStart = timelineStart.getHours();
                    $scope.timelineEnd = timelineEnd.getHours();
                    $scope.timelineDuration = $scope.timelineEnd - $scope.timelineStart;

                    $scope.timelineHours = [];

                    for (var h = $scope.timelineStart; h <= $scope.timelineEnd; h++) {
                        $scope.timelineHours.push(h);
                    }

                    $rootScope.subtitle = $scope.title = $scope.getTitle(data) +
                        ', ' + getWeekType(data.week);

                    $scope.lessonsStyle = { 'height': $scope.timelineDuration * 80 + 'px' };
                    $scope.colStyle = { width: Math.ceil((1 / $scope.schedule.length) * 100) + '%' };

                    $scope.isCurrentWeek = highlightToday;

                    $scope.showTeacher = type !== 'teacher';
                    $scope.showRoom = type !== 'room';
                    $scope.showGroups = type !== 'group';

                    var buildingId = undefined;

                    if ('room' in data && 'building' in data.room) {
                        buildingId = data.room.building.id;
                    }

                    if (buildingId == 30) {
                        $scope.showGroups = false;
                    }

                    $scope.time = $scope.getTime();
                })
                .catch(function(reason) {
                    $scope.start_date = $location.search().date ?
                        new Date($location.search().date) : new Date();

                    $rootScope.subtitle = '';
                    $scope.error = true;
                    $scope.errorMessage = reason.errorMessage;
                });
        }]);
