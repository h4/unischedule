var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.service('ScheduleService', [
    '$q', 'Schedule', function($q, Schedule) {
        function isCurrentWeek(week) {
            var startDate = dateFromString(week.date_start),
                endDate = dateFromString(week.date_end),
                today = new Date();

            return today > startDate && today <= endDate;
        }

        function dateFromString(dateString) {
            var dateArr = dateString.split('.');

            return new Date(dateArr[0], (dateArr[1] - 1), dateArr[2]);
        }

        var todaysDay = new Date().getDay(),
            getResult = function(params) {
                var result = $q.defer();

                Schedule
                    .get(params, function(data) {
                        var schedule,
                            highlightToday = isCurrentWeek(data.week);

                        if (data.error) {
                            result.reject({
                                errorMessage: data.text
                            });
                        }

                        schedule = data.days
                            .map(function(day) {
                                var lessonsStartTimes = [];

                                day.today = (highlightToday && todaysDay === day.weekday % 7) ?
                                    'yes' : 'no';

                                day.lessons.forEach(function(lesson, lessonId, lessons) {
                                    var timeStart = lesson.time_start.split(":"),
                                        timeEnd = lesson.time_end.split(":");
                                    lesson.startPosition = (timeStart[0] - 7);

                                    lesson.duration = lesson.time_end.split(":")[0] - lesson.time_start.split(":")[0]
                                        + 1;

                                    lesson.className = 'lesson_start_' + lesson.startPosition;
                                    lesson.className += ' lesson_duration_' + lesson.duration;
                                    if (lessonsStartTimes.indexOf(lesson.time_start) != -1) {
                                        lesson.className += ' lesson_double';
                                    }
                                    lessonsStartTimes.push(lesson.time_start);

                                    var others = lessons.filter(function(otherLesson, otherLessonId) {
                                        var otherTimeStart = otherLesson.time_start.split(":"),
                                            otherTimeEnd = otherLesson.time_end.split(":");

                                        if (otherLessonId === lessonId) {
                                            return false;
                                        }

                                        if (timeStart[0] < otherTimeStart[0] && timeEnd[0] < otherTimeStart[0]) {
                                            return false;
                                        }

                                        if (otherTimeStart[0] < timeStart[0] && otherTimeEnd[0] < timeStart[0]) {
                                            return false;
                                        }

                                        return true;
                                    });

                                    if (others.length > 0) {
                                        lesson.className += ' lesson_overlaps';
                                    }

                                    // TODO: Move to directive
                                    //if (day.today == 'yes' && $scope._isCurrentLesson(lesson)) {
                                    //    lesson.className += ' lesson_current'
                                    //}
                                });

                                return day;
                            })
                            .sort(function(cur, prev) {
                                return cur.weekday - prev.weekday;
                            });

                        data.schedule = schedule;

                        result.resolve(data)
                    });

                return result.promise;
            };

        return {
            getResult: getResult
        }
    }
]);
